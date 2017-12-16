function createThunkMiddleware (extraArgument) {
  return ({ dispatch, getState }) => next => (action) => {
    if (typeof action === 'function') {
      const result = action(dispatch, getState, extraArgument);

      if (isNextable(result)) {
        return handleIterator(result, dispatch);
      }

      return result;
    }

    return next(action);
  };
}

async function handleIterator (iterator, dispatch) {
  let { done, value } = await iterator.next();

  while (done === false) {
    if (isThenable(value)) {
      value = await value;
    }
    if (isActionLike(value)) {
      dispatch(value);
    }
    ({ done, value } = await iterator.next(value));
  }

  return value;
}

function isActionLike (obj) {
  return (typeof obj === 'object' && typeof obj.type !== 'undefined') || typeof obj === 'function';
}

function isThenable (obj) {
  return typeof obj === 'object' && typeof obj.then === 'function';
}

function isNextable (obj) {
  return typeof obj === 'object' && typeof obj.next === 'function';
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
