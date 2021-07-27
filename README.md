<img width="100%" src="https://media1.tenor.com/images/7f4c613aad8a38bf83d01b67d58062ba/tenor.gif?itemid=5354943" />

<br />

<div align="center">
<a href="https://www.javascript.com/"><img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/></a>
<a href="https://github.com/grimmbraten/all-aboard"><img alt="GitHub" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"/></a>

</div>

<br />

A small Javascript library to perform parallel and/or sequential asynchronous tasks with ease.

## Installation

```bash
yarn add all-aboard
```

```bash
npm install all-aboard
```

## Upgrade

```bash
yarn upgrade all-aboard --latest
```

For more information, please refer to the [yarn documentation](https://classic.yarnpkg.com/en/docs/cli/upgrade).

```bash
npm update all-aboard
```

For more information, please refer to the [npm documentation](https://docs.npmjs.com/cli/v6/commands/npm-update).

## Usage

### Sequence

```javascript
const { sequence } = require("all-aboard");

(async () => {
  await sequence(asyncFunc, () => asyncFunc("with argument"));
})();
```

If you want asynchronous functions be be executed one after another before proceeding on the main thread, you can use the sequence function. Each asynchronous function will be executed in the order that they are defined in the array.

### Parallel

```javascript
const { parallel } = require("all-aboard");

(async () => {
  await parallel(() => asyncFunc("with argument"), asyncFunc);
})();
```

If you want asynchronous functions to be executed as fast as possible before proceeding on the main thread, you can use the parallel function. Each asynchronous function will be executed as soon as possible, but the main thread will not proceed until each promise has been resolved.

### Please note

Asynchronous functions without passing any arguments can passed to a function by using the function name

```javascript
await parallel(asyncFunc);
```

But asynchronous functions with passed arguments needs to either be wrapped by an anonymous function or you'll have to bind the arguments to the function.

```javascript
await sequence(() => asyncFunc("argument"));
```

```javascript
await parallel(asyncFunc.bind(this, "argument"));
```

## Uninstall

```bash
yarn remove all-aboard
```

```bash
npm uninstall all-aboard
```
