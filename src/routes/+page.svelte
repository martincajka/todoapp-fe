<script>
  import { text } from "@sveltejs/kit";
  import { todos } from "./data.svelte.js";
  import { assignees } from "./data.svelte.js";
  import FilteredTodos from "./FilteredTodos.svelte";

  let newTodo = $state({ text: "" });
  let expandedTodo = $state(null); // Track the currently expanded todo item

  let search = $state("");

  function filtered(predicate) {
    return todos.filter(predicate).filter((d) => {
      if (search === "") return true;
      const regex = new RegExp(search, "i");
      return regex.test(d.text);
    });
  }
  function displayActive() {
    return filtered((t) => !t.done && !t.deleted);
  }

  function displayCompleted() {
    return filtered((t) => t.done && !t.deleted);
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
      todos.unshift(newTodoItem);
      // todos = [newTodoItem, ...todos];
      newTodo.text = "";
    }
  }

  function handleKeydown(event) {
    if (event.key === "Enter") {
      add();
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
    todos.forEach((t) => {
      if (t.done) {
        t.deleted = true;
      }
    });
    // todos = todos.filter((t) => !t.done);
  }

  let remainingTodos = $derived(
    todos.filter((t) => !t.done && !t.deleted).length
  );
  let allTodos = $derived(todos.filter((t) => !t.deleted).length);
</script>

<main>
  <div class="centered">
    <h1>todos</h1>
    <label>
      Filter: <input bind:value={search} />
    </label>
    <ul class="todos">
      <li class="todo-input">
        <button onclick={add}>+</button>
        <input
          type="text"
          placeholder="What needs to be done?"
          bind:value={newTodo.text}
          onkeydown={handleKeydown}
        />
      </li>
      <FilteredTodos data={displayActive()} row={todoRow} />
    </ul>
    <p>{remainingTodos} of {allTodos} remaining</p>
    {#if allTodos !== remainingTodos}
      <h5>Completed</h5>
      <ul class="todos">
        <button onclick={clear}> Clear completed </button>
        <FilteredTodos data={displayCompleted()} row={doneRow} />
      </ul>
    {/if}
  </div>
</main>

{#snippet todoRow(d)}
  <li class="todo" class:done={d.done} class:highlight={d.new}>
    <div class="todo-header">
      <input type="checkbox" bind:checked={d.done} />
      <input type="text" class="todo-label" bind:value={d.text} />
      <button onclick={() => toggleExpand(todo)}>More</button>
      <select bind:value={d.assignee}>
        {#each assignees as assignee}
          <option value={assignee}>
            {assignee.text}
          </option>
        {/each}
      </select>
      <button>Edit</button>
      <button onclick={deleteTodo(d)}>x</button>
    </div>
    {#if expandedTodo === d}
      <div class="details">
        <p>Created At: {new Date(d.createdAt).toLocaleString()}</p>
        {#if d.deadline}
          <p>Deadline: {new Date(d.deadline).toLocaleString()}</p>
        {/if}
      </div>
    {/if}
  </li>
{/snippet}

{#snippet doneRow(d)}
  <li class="todo" class:done={d.done}>
    <div class="todo-header">
      <input type="checkbox" bind:checked={d.done} />
      <input type="text" class="todo-label" bind:value={d.text} />
      <button onclick={() => toggleExpand(d)}>More</button>
      <span>{d.assignee.text}</span>
      <button onclick={deleteTodo(d)}>x</button>
    </div>
    {#if expandedTodo === d}
      <div class="details">
        <p>Created At: {new Date(d.createdAt).toLocaleString()}</p>
        {#if d.deadline}
          <p>Deadline: {new Date(d.deadline).toLocaleString()}</p>
        {/if}
      </div>
    {/if}
  </li>
{/snippet}

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
