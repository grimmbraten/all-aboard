const { sequence, parallel } = require("./main");

const succeed = () => new Promise(resolve => setTimeout(resolve, 10));
const fail = () => new Promise((_, reject) => setTimeout(reject, 10));

const fulfilled = { status: "fulfilled", value: undefined };
const rejected = { reason: undefined, status: "rejected" };

describe("sequence()", () => {
  test.each([
    [
      [succeed, fail],
      [fulfilled, rejected]
    ],
    [
      [fail, succeed, fail],
      [rejected, fulfilled, rejected]
    ]
  ])(
    "run %s in given order and receives expected response",
    async (asyncFuncArr, expected) => {
      const response = await sequence(asyncFuncArr);
      expect(response).toEqual(expected);
    }
  );

  describe("throws an error if", () => {
    test.each([
      [
        "passed tasks isn't an array",
        succeed,
        [],
        "expected tasks to be type of array, but received function"
      ],
      [
        "a passed tasks item isn't a asynchronous function",
        ["invalid"],
        ["foo"],
        "expected tasks to be type of [AsyncFunction: name] or [Function (anonymous)], but received string"
      ],
      [
        "passed arguments isn't an array",
        [succeed],
        "foo",
        "expected arguments to be type of array or undefined, but received string"
      ]
    ])("%s", async (_, asyncFuncArr, passed, expected) => {
      try {
        await sequence(asyncFuncArr, passed);
      } catch (error) {
        expect(error.message).toEqual(expected);
      }
    });
  });

  it("ejects after rejected promise if eject is set to true", async () => {
    const response = await sequence([succeed, fail, succeed], [], true);
    expect(response).toEqual([fulfilled, rejected]);
  });
});

describe("parallel()", () => {
  test.each([
    [[succeed, fail], undefined, [fulfilled, rejected]],
    [
      [fail, succeed, fail],
      ["foo", "bar"],
      [rejected, fulfilled, rejected]
    ]
  ])(
    "run %s in given order and receives expected response",
    async (asyncFuncArr, passed, expected) => {
      const response = await parallel(asyncFuncArr, passed);
      expect(response).toEqual(expected);
    }
  );

  describe("throws an error if", () => {
    test.each([
      [
        "passed tasks isn't an array",
        succeed,
        [],
        "expected tasks to be type of array, but received function"
      ],
      [
        "a passed tasks item isn't a asynchronous function",
        ["invalid"],
        ["foo"],
        "expected tasks to be type of [AsyncFunction: name] or [Function (anonymous)], but received string"
      ],
      [
        "passed arguments isn't an array",
        [succeed],
        "foo",
        "expected arguments to be type of array or undefined, but received string"
      ]
    ])("%s", async (_, asyncFuncArr, passed, expected) => {
      try {
        await parallel(asyncFuncArr, passed);
      } catch (error) {
        expect(error.message).toEqual(expected);
      }
    });
  });
});
