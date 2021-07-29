const hasValidTasks = tasks => {
  if (!Array.isArray(tasks))
    throw new TypeError(
      `expected tasks to be type of array, but received ${typeof tasks}`
    );

  tasks.forEach(task => {
    if (typeof task !== "function")
      throw new TypeError(
        `expected tasks to be type of [AsyncFunction: name] or [Function (anonymous)], but received ${typeof task}`
      );
  });
};

const hasValidArguments = passed => {
  if (!(Array.isArray(passed) || passed === undefined))
    throw new TypeError(
      `expected arguments to be type of array or undefined, but received ${typeof passed}`
    );
};

const sequence = async (tasks, passed, eject = false) => {
  let proceed = true;
  const settled = [];

  hasValidTasks(tasks);
  hasValidArguments(passed);

  for (const task of tasks) {
    if (proceed) {
      try {
        const response = passed ? await task(...passed) : await task();
        settled.push({ status: "fulfilled", value: response });
      } catch (error) {
        if (eject) proceed = false;
        settled.push({ status: "rejected", reason: error });
      }
    }
  }

  return settled;
};

const parallel = (tasks, passed) => {
  let promises = [];

  hasValidTasks(tasks);
  hasValidArguments(passed);

  tasks.forEach(task => {
    promises.push(passed ? task(...passed) : task());
  });

  return Promise.allSettled(promises);
};

module.exports = {
  parallel,
  sequence
};
