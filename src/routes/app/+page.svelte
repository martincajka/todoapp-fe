<script lang="ts">
  import { text } from "@sveltejs/kit";
  import { todos } from "$lib/data.svelte.js";
  import { assignees } from "$lib/data.svelte.js";
  import FilteredTodos from "./FilteredTodos.svelte";
  import Info from "$icons/Info.svelte";
  import Delete from "$icons/Delete.svelte";
  import Edit from "$icons/Edit.svelte";
  import Plus from "$icons/Plus.svelte";
  import Button from "$btns/Button.svelte";
  import IconButton from "$btns/IconButton.svelte";
  import { slide } from "svelte/transition";

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
  // TODO fix highlighting newly added item
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

<main class="todo-container">
  <div class="todo-box">
    <h1>Your day</h1>

    <div class="search-box">
      <input
        type="text"
        placeholder="Search todos..."
        bind:value={search}
        class="text-input"
      />
    </div>

    <div class="new-todo-box">
      <input
        type="text"
        class="text-input"
        placeholder="What needs to be done?"
        bind:value={newTodo.text}
        onkeydown={handleKeydown}
      />
      <Button onclick={add}><Plus iconStyle="medium primary"></Plus></Button>
    </div>

    <div class="current-todo-box">
      <FilteredTodos data={displayActive()} row={todoRow} />
    </div>

    <div class="todo-stats">
      <p>{remainingTodos} of {allTodos} remaining</p>
    </div>

    {#if allTodos !== remainingTodos}
      <div class="done-todo-box">
        <Button variant="danger" onclick={clear}>Delete completed</Button>
        <FilteredTodos data={displayCompleted()} row={doneRow} />
      </div>
    {/if}
  </div>
</main>

{#snippet todoRow(d)}
  <div class="todo-wrapper">
    <div class="todo-header">
      <input type="checkbox" class="todo-checkbox" bind:checked={d.done} />
      <div class="todo-content">
        <span class="text-label">{d.text}</span>
      </div>
      <div class="todo-assignee">
        <select class="assign-select" bind:value={d.assignee}>
          {#each assignees as assignee}
            <option value={assignee}>
              {assignee.text}
            </option>
          {/each}
        </select>
      </div>
      <div class="todo-actions">
        <IconButton aria-label="More info" onclick={() => toggleExpand(d)}>
          <Info iconStyle="small primary" />
        </IconButton>
        <IconButton aria-label="Edit item">
          <Edit iconStyle="small primary" />
        </IconButton>
        <IconButton
          variant="danger"
          aria-label="Delete item"
          onclick={deleteTodo(d)}
        >
          <Delete iconStyle="small danger" />
        </IconButton>
      </div>
    </div>
    {#if expandedTodo === d}
      <div class="todo-more-info" transition:slide>
        <p>Created At: {new Date(d.createdAt).toLocaleString()}</p>
        {#if d.deadline}
          <p>Deadline: {new Date(d.deadline).toLocaleString()}</p>
        {/if}
      </div>
    {/if}
  </div>
{/snippet}

{#snippet doneRow(d)}
  <div class="todo-header">
    <input type="checkbox" class="todo-checkbox" bind:checked={d.done} />
    <div class="todo-content">
      <span class="text-label">{d.text}</span>
    </div>
    <div class="todo-assignee">
      <span class="text-label">{d.assignee.text}</span>
    </div>
    <div class="todo-actions">
      <IconButton aria-label="More info" onclick={() => toggleExpand(d)}>
        <Info iconStyle="small primary" />
      </IconButton>
      <IconButton
        variant="danger"
        aria-label="Delete item"
        onclick={deleteTodo(d)}
      >
        <Delete iconStyle="small danger" />
      </IconButton>
    </div>
  </div>
  {#if expandedTodo === d}
    <div>
      <p>Created At: {new Date(d.createdAt).toLocaleString()}</p>
      {#if d.deadline}
        <p>Deadline: {new Date(d.deadline).toLocaleString()}</p>
      {/if}
    </div>
  {/if}
{/snippet}

<style>
  .todo-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    background-color: #f8fafc;
  }

  .todo-box {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 800px;
  }

  h1 {
    color: #4f46e5;
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .search-box {
    margin-bottom: 1.5rem;
    width: 100%;
    display: flex;
  }

  .text-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s ease;
  }

  .text-input:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  .text-label {
    font-size: 1rem;
    padding: 0.75rem;
  }

  .new-todo-box {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .current-todo-box {
    margin-bottom: 2rem;
  }

  .todo-wrapper {
    display: flex;
    flex-direction: column;
    background: white;
    width: 100%;
  }

  .todo-header {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 1rem;
  }

  .todo-checkbox {
    flex: 0 0 auto;
    width: 1.25rem;
    height: 1.25rem;
    accent-color: #6366f1;
  }

  .todo-content {
    flex: 1 1 auto;
    min-width: 0;
  }

  .todo-assignee {
    flex: 0 0 auto;
    display: flex;
    margin-left: auto;
  }

  .todo-actions {
    flex: 0 0 auto;
    display: flex;
    margin-left: auto;
  }

  .todo-more-info {
    width: 100%;
    margin-top: 1rem;
  }

  .assign-select {
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s ease;
  }

  .todo-stats {
    text-align: center;
    color: #64748b;
    margin: 1.5rem 0;
  }

  .done-todo-box {
    padding-top: 1rem;
    border-top: 1px solid #e2e8f0;
  }
</style>
