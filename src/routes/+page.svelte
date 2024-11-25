<script>
  import { text } from "@sveltejs/kit";

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

  let newTodo = $state({ text: "" });
  let expandedTodo = $state(null); // Track the currently expanded todo item

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

  function toggleExpand(todo) {
    expandedTodo = expandedTodo === todo ? null : todo;
  }

  function deleteTodo(todo) {
    return () => {
      todo.deleted = true;
    };
  }

  function clear() {
    todos = todos.filter((t) => !t.done);
  }

  let remainingTodos = $derived(
    todos.filter((t) => !t.done && !t.deleted).length
  );
  let allTodos = $derived(todos.filter((t) => !t.deleted).length);
</script>

<main>
  <div class="centered">
    <h1>todos</h1>
    <ul class="todos">
      <li class="todo-input">
        <button onclick={add}>+</button>
        <input
          type="text"
          placeholder="What needs to be done?"
          bind:value={newTodo.text}
        />
      </li>
      {#each displayActive() as todo}
        <li class="todo" class:done={todo.done} class:highlight={todo.new}>
          <div class="todo-header">
            <input type="checkbox" bind:checked={todo.done} />
            <input type="text" class="todo-label" bind:value={todo.text} />
            <button onclick={() => toggleExpand(todo)}>More</button>
            <select bind:value={todo.assignee}>
              {#each assignees as assignee}
                <option value={assignee}>
                  {assignee.text}
                </option>
              {/each}
            </select>
            <button>Edit</button>
            <button onclick={deleteTodo(todo)}>x</button>
          </div>
          {#if expandedTodo === todo}
            <div class="details">
              <p>Created At: {new Date(todo.createdAt).toLocaleString()}</p>
              {#if todo.deadline}
                <p>Deadline: {new Date(todo.deadline).toLocaleString()}</p>
              {/if}
            </div>
          {/if}
        </li>
      {/each}
    </ul>
    <p>{remainingTodos} of {allTodos} remaining</p>
    {#if allTodos !== remainingTodos}
      <h5>Completed</h5>
      <ul class="todos">
        <button onclick={clear}> Clear completed </button>
        {#each displayCompleted() as todo}
          <li class="todo" class:done={todo.done}>
            <div class="todo-header">
              <input type="checkbox" bind:checked={todo.done} />
              <input type="text" class="todo-label" bind:value={todo.text} />
              <button onclick={() => toggleExpand(todo)}>More</button>
              <span>{todo.assignee.text}</span>
              <button onclick={deleteTodo(todo)}>x</button>
            </div>
            {#if expandedTodo === todo}
              <div class="details">
                <p>Created At: {new Date(todo.createdAt).toLocaleString()}</p>
                {#if todo.deadline}
                  <p>Deadline: {new Date(todo.deadline).toLocaleString()}</p>
                {/if}
              </div>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
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

  ul {
    list-style: none;
    padding: 0;
  }

  li.todo-input {
    display: flex;
    align-items: center;
    margin: 0.5em 0;
  }

  li.todo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0.5em 0;
  }

  .todo-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .details {
    margin-top: 0.5em;
    width: auto;
    text-align: left;
  }

  .details p {
    margin: 0.5em 0 0 0;
  }

  input[type="text"] {
    flex: 1;
    padding: 0.5em;
    margin: -0.2em 0;
    border: none;
  }
</style>
