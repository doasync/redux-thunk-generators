# Redux thunk + generators

You can use generators as action creators or thunks. Fully compartible with redux-thunk!

[![NPM Version][npm-image]][npm-url] ![NPM Downloads][downloads-image] [![GitHub issues][issues-image]][issues-url] [![Licence][license-image]][license-url]

[npm-image]: https://img.shields.io/npm/v/redux-thunk-generators.svg
[npm-url]: https://www.npmjs.com/package/redux-thunk-generators
[downloads-image]: https://img.shields.io/npm/dw/redux-thunk-generators.svg
[deps-image]: https://david-dm.org/doasync/redux-thunk-generators.svg
[issues-image]: https://img.shields.io/github/issues/doasync/redux-thunk-generators.svg
[issues-url]: https://github.com/doasync/redux-thunk-generators/issues
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://raw.githubusercontent.com/doasync/redux-thunk-generators/master/LICENSE

## Installation

```bash
npm install --save redux-thunk-generators
```

Just replace **redux-thunk** import with **redux-thunk-generators**

## Usage

You can use generators (sync or async) as thunks:
```javascript
export const signIn = payload => async function* (dispatch, getState, extraArgument) { /* ... */ }
```

Or use generators as action creators:
```javascript
export const signIn = async function* (payload) { /* ... */ }
```

Yield action objects to dispatch them! Forget about wrapping each time with `dispatch`:

```javascript
// Action creator
export const signIn = async function* (payload) {
  const { username, password } = payload;
  let state = yield; // won't be dispatched, just returns current state
  yield signInStart();
  try {
    const response = await axios.post(API_SIGN_IN, { username, password });
    yield signInEnd();
    yield signInSuccess(response.data);
    return username;
  } catch (error) {
    yield signInEnd();
    yield signInError(error);
  }
};
```

`yield` always returns a (new) state.

If you want to do something when your action is done, `return` some data from generator and get it with .then:

```javascript
signIn().then(username => {
  console.log(username)
});
```

Yep, nice) Tell your friend.

## Author

@doasync
