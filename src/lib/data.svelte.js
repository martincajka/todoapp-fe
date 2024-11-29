export let assignees = $state([
    {
      id: 1,
      text: `Not assigned`,
    },
    {
      id: 2,
      text: `John Doe`,
    },
    {
      id: 3,
      text: `Jane Doe`,
    },
  ]);

 export let todos = $state([
    {
      done: false,
      deleted: false,
      createdAt: Date.now(),
      assignee: assignees[0],
      deadline: null,
      new: false,
      text: "finish Svelte tutorial",
    },
    {
      done: false,
      deleted: false,
      createdAt: Date.now(),
      assignee: assignees[0],
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 7,
      new: false,
      text: "build an app",
    },
    {
      done: false,
      deleted: false,
      createdAt: Date.now(),
      assignee: assignees[0],
      deadline: null,
      new: false,
      text: "world domination",
    },
  ]);