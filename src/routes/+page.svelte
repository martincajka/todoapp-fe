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
      text: "finish Svelte tutorial",
    },
    {
      done: false,
      deleted: false,
      createdAt: Date.now(),
      assignee: assignees[0],
      deadline: null,
      text: "build an app",
    },
    {
      done: false,
      deleted: false,
      createdAt: Date.now(),
      assignee: assignees[0],
      deadline: null,
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

  function add() {
    if (newTodo.text.trim()) {
      todos.unshift({
        done: false,
        deleted: false,
        createdAt: Date.now(),
        assignee: assignees[0],
        deadline: null,
        text: newTodo.text,
      });
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
      <li class="new-todo">
        <button onclick={add}>+</button>
        <input
          type="text"
          placeholder="What needs to be done?"
          bind:value={newTodo.text}
        />
      </li>
      {#each displayActive() as todo}
        <li class:done={todo.done}>
          <input type="checkbox" bind:checked={todo.done} />
          <input type="text" bind:value={todo.text} />
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
      <li class="new-todo">
        <button onclick={clear}> Clear completed </button>
      </li>
      {#each displayCompleted() as todo}
        <li class:done={todo.done}>
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

  .new-todo {
    display: flex;
    align-items: center;
    margin: 0.5em 0;
  }

  .centered {
    max-width: auto;
    margin: 0 auto;
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
