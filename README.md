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

You can just remplace *redux-thunk* import with *redux-thunk-generators*

## Usage

Just yield actions! Forget about dispatch. Async action? Yield promise and get the response!

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
But y'd better use async generators for that, they are supported too!
```javascript
export const signIn = (payload) => async function* () {
  const { username, password } = payload;
  yield signInStart();
  try {
    const response = await axios.post(API_SIGN_IN, { username, password });
    yield signInEnd();
    yield signInSuccess(response.data);
  } catch (error) {
    yield signInEnd();
    yield signInError(error);
  }
};
```

Return something from generator and get it with .then:

```javascript
signIn().then(something => {
  console.log(something)
});
```

See source code for more information ;)

## Author

@doasync
