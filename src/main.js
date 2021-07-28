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
}

const hasValidArguments = arguments => {
  if(!(Array.isArray(arguments) || arguments === undefined))
    throw new TypeError(
      `expected arguments to be type of array or undefined, but received ${typeof arguments}`
    );
}

const sequence = async (tasks, arguments, eject = false) => {
  let proceed = true;
  const settled = [];

  hasValidTasks(tasks);
  hasValidArguments(arguments);
  
  for (const task of tasks) {
    if(proceed) {
      try {
        const response = arguments ? await task(...arguments) : await task();
        settled.push({ status: 'fulfilled', value: response });
      } catch (error) {
        if (eject) proceed = false;
        settled.push({ status: 'rejected', reason: error });
      }
    }
  }

  return settled;
};

const parallel = (tasks, arguments) => {
  let promises = [];

  hasValidTasks(tasks);
  hasValidArguments(arguments);

  tasks.forEach(task => {
    promises.push(arguments ? task(...arguments) : task());
  });

  return Promise.allSettled(promises);
};

module.exports = {
  parallel,
  sequence
};
