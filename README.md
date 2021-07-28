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

The `sequence` function allows you to run asynchronous functions in order, one after the other, before proceeding on the main thread. Each asynchronous function is executed in incremental order, meaning that `tasks[0]` runs first, `tasks[1]` after that, and so on.

Uniquely to the `sequence` function, you have the option to be ejected back on the main thread if any of the asynchronous tasks are rejected. This means that if a task throws an error in the middle, the `sequence` function will not continue to run the remaining tasks.

#### Structure

```javascript
const response = await sequence(tasks[], arguments[], eject);
```

#### Example

```javascript
const { sequence } = require("all-aboard");

const arr = [async1, async2, async3];

(async () => {
  await sequence(arr, ["shared", "arguments"], true);
})();
```

### Parallel

The `parallel` function allows you to run asynchronous functions in parallel, non-blocking behavior, before proceeding on the main thread. Each asynchronous function will be executed as soon as possible, but the main thread will not proceed until each promise has been settled.

#### Structure

```javascript
const response = await parallel(tasks[], arguments[]);
```

#### Example

```javascript
const { parallel } = require("all-aboard");

(async () => {
  await parallel(() => asyncFunc("with argument"), asyncFunc);
})();
```

### Arguments

If you want to run an asynchronous function without passing any arguments, you can pass the function as a task to the `sequence` or `parallel` function.

```javascript
await parallel(asyncFunc);
```

#### Specific

Things become more tricky if you want to run an asynchronous function with some passed arguments. In that case, you need to either:

1. Wrap the asynchronous function in an anonymous function.

```javascript
await sequence(() => asyncFunc("foo"));
```

2. Bind the desired arguments to the passed asynchronous function.

```javascript
await parallel(asyncFunc.bind(this, "bar", "baz"));
```

#### Shared

You might come across a use case where you would like to pass the same arguments to each asynchronous function in your tasks. Instead of repeating yourself, you can pass all shared arguments to the `sequence` or `parallel` function by passing them in an array after the `tasks` argument.

```javascript
await sequence(asyncFuncArr, ["foo", "bar"]);
```

**Please note** that shared arguments can be overwritten by specific arguments

### Response

Each response contains a promise summary of each executed task. If the status is `fulfilled`, the object will contain a `value` property containing the returned value from the successful task. If the status has been `rejected`, the object will instead contain a `reason` property with thrown error from the unsuccessful task.

```javascript
[
  { status: "fulfilled", value: undefined },
  { status: "fulfilled", value: "returned value" },
  { status: "rejected", reason: "thrown error" }
];
```

## Uninstall

```bash
yarn remove all-aboard
```

```bash
npm uninstall all-aboard
```
