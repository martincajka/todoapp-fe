<script>
  import TodoItem from "../components/TodoItem.svelte";

  let todos = [];
  let newTodo = "";
  let newTodoIndex = -1;

  function addTodo() {
    if (newTodo.trim()) {
      todos = [...todos, { text: newTodo, done: false }];
      newTodoIndex = todos.length - 1;
      newTodo = "";

      setTimeout(() => {
        newTodoIndex = -1;
      }, 3000);
    }
  }

  function toggleTodoDone(index) {
    todos = todos.map((todo, i) =>
      i === index ? { ...todo, done: !todo.done } : todo
    );
  }

  function deleteTodo(index) {
    todos = todos.filter((_, i) => i !== index);
  }
</script>

<main>
  <h1>Todo App</h1>
  <input bind:value={newTodo} placeholder="What needs to be done?" />
  <button on:click={addTodo}>Add</button>

  <ul>
    {#each todos as todo, index}
      <TodoItem
        {todo}
        {index}
        {toggleTodoDone}
        {deleteTodo}
        isNew={index === newTodoIndex}
      />
    {/each}
  </ul>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 800px;
    margin: 0 auto;
  }

  input {
    margin: 0.5em;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  button {
    margin-left: 1em;
  }
</style>
