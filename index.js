function createThunkMiddleware (extraArgument) {
  return ({ dispatch, getState }) => next => (action) => {
    if (typeof action === 'function') {
      const result = action(dispatch, getState, extraArgument);

      if (typeof result === 'object' && typeof result.next === 'function') {
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
    if (typeof value === 'object' && typeof value.type !== 'undefined') {
      dispatch(value);
    }
    // eslint-disable-next-line no-await-in-loop
    ({ done, value } = await iterator.next(value));
  }

  return value;
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
