<script>
  export let todo;
  export let index;
  export let toggleTodoDone;
  export let deleteTodo;
  export let isNew = false;
</script>

<div class="card {isNew ? 'highlight' : ''} {todo.done ? 'done' : ''}">
  <li>
    <input
      type="checkbox"
      checked={todo.done}
      on:change={() => toggleTodoDone(index)}
    />
    <span
      class="todo-text"
      style:text-decoration={todo.done ? "line-through" : "none"}
    >
      {todo.text}
    </span>
    <button on:click={() => deleteTodo(index)}>Delete</button>
  </li>
</div>

<style>
  .card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 0.5em 0;
    padding: 1em;
    transition: box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .highlight {
    animation: fadeHighlight 3s forwards;
  }

  .done {
    background-color: #f0f0f0;
  }

  @keyframes fadeHighlight {
    0% {
      background-color: yellow;
    }
    100% {
      background-color: #fff;
    }
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  .todo-text {
    flex-grow: 1;
    margin: 0 1em;
    word-wrap: break-word;
    max-width: 80%;
  }

  button {
    background-color: #ff6b6b;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    padding: 0.5em 1em;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #ff4c4c;
  }

  input[type="checkbox"] {
    cursor: pointer;
  }
</style>
