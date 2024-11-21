<script>
  import { text } from "@sveltejs/kit";
  import TodoItem from "../components/TodoItem.svelte";
  import TodoList from "../components/TodoList.svelte";

  let assignees = $state([
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

  let selected = $state();

  let todos = $state([
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
      deadline: null,
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

  let newTodo = $state({ text: "" });

  function displayActive() {
    return todos.filter((t) => !t.done && !t.deleted);
  }

  function displayCompleted() {
    return todos.filter((t) => t.done && !t.deleted);
  }
  // todo fix highlighting newly added item
  function add() {
    if (newTodo.text.trim()) {
      let newTodoItem = {
        done: false,
        deleted: false,
        createdAt: Date.now(),
        assignee: assignees[0],
        deadline: null,
        text: newTodo.text,
        new: true,
      };
      todos = [newTodoItem, ...todos];
      newTodo.text = "";
    }
  }

  function deleteTodo(todo) {
    return () => {
      todo.deleted = true;
    };
  }

  function clear() {
    todos = todos.filter((t) => !t.done);
  }

  let remaining = $derived(todos.filter((t) => !t.done && !t.deleted).length);
  let notDeleted = $derived(todos.filter((t) => !t.deleted).length);
</script>

<main>
  <div class="centered">
    <h1>todos</h1>
    <ul class="todos">
      <li class="todo">
        <button onclick={add}>+</button>
        <input
          type="text"
          placeholder="What needs to be done?"
          bind:value={newTodo.text}
        />
      </li>
      {#each displayActive() as todo}
        <li class="todo" class:done={todo.done} class:highlight={todo.new}>
          <input type="checkbox" bind:checked={todo.done} />
          <input type="text" class="todo-label" bind:value={todo.text} />
          <select bind:value={todo.assignee}>
            {#each assignees as assignee}
              <option value={assignee}>
                {assignee.text}
              </option>
            {/each}
          </select>
          <button>Edit</button>
          <button onclick={deleteTodo(todo)}>x</button>
        </li>
      {/each}
    </ul>
    <p>{remaining} of {notDeleted} remaining</p>
    <h5>Completed</h5>
    <ul class="todos">
      <button onclick={clear}> Clear completed </button>
      {#each displayCompleted() as todo}
        <li class="todo" class:done={todo.done}>
          <input type="checkbox" bind:checked={todo.done} />
          <input type="text" bind:value={todo.text} />
          <span>{todo.assignee.text}</span>
          <button onclick={deleteTodo(todo)}>x</button>
        </li>
      {/each}
    </ul>
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 800px;
    margin: 0 auto;
  }

  .todo {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 0.5em 0;
    padding: 1em;
    transition: box-shadow 0.3s ease;
    display: flex;
  }

  .todo:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .todo-label {
    background-color: transparent;
  }

  .centered {
    max-width: auto;
    margin: 0 auto;
  }

  .highlight {
    animation: fadeHighlight 3s forwards;
  }

  @keyframes fadeHighlight {
    0% {
      background-color: yellow;
    }
    100% {
      background-color: #fff;
    }
  }
  .done {
    opacity: 0.4;
  }

  li {
    display: flex;
  }

  input[type="text"] {
    flex: 1;
    padding: 0.5em;
    margin: -0.2em 0;
    border: none;
  }

  ul {
    list-style: none;
    padding: 0;
  }
</style>
