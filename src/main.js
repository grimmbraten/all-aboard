const sequence = async (tasks, ...arguments) => {
  if (!Array.isArray(tasks))
    throw new TypeError(
      `expected parameter with type of array, received ${typeof tasks}`
    );

  for (const task of tasks) {
    if (typeof task !== "function")
      throw new TypeError(
        `expected [AsyncFunction: name] or [Function (anonymous)], received ${typeof task}`
      );
     arguments ? await task(...arguments) : await task();
  }
};

const parallel = (tasks, ...arguments) => {
  let promises = [];

  if (!Array.isArray(tasks))
    throw new TypeError(
      `expected parameter with type of array, received ${typeof tasks} instead`
    );

  tasks.forEach(task => {
    if (typeof task !== "function")
      throw new TypeError(
        `expected [AsyncFunction: name] or [Function (anonymous)], received ${typeof task}`
      );
    promises.push(arguments ? task(...arguments) : task());
  });

  return Promise.all(promises);
};

module.exports = {
  parallel,
  sequence
};
