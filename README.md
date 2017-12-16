# Redux thunk + generators

You can use generators instead of functions. Fully compartible with redux-thunk!

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

Yield action objects to dispatch them! Forget about wrapping each time with `dispatch` (but you can).
Async actions? Yield promise and get the response! Feels just like *await* :)

```javascript
export const signIn = (payload) => function* () {
  const { username, password } = payload;
  yield signInStart();
  try {
    const response = yield axios.post(API_SIGN_IN, { username, password });
    yield signInEnd();
    yield signInSuccess(response.data);
  } catch (error) {
    yield signInEnd();
    yield signInError(error);
  }
};
```

You'd better use async generators for that, they are supported too (not by your babel preset though... ;)

```javascript
export const signIn = (payload) => async function* () {
  const { username, password } = payload;
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

You can use fetch API of coarse.

If you want to do something when your action is done, `return` some data from generator and get it with .then:

```javascript
signIn().then(username => {
  console.log(username)
});
```

Yep, nice) Tell your friend.

## Author

@doasync

See source code for more information.
