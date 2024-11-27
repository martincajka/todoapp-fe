<script>
  let { data, row } = $props();
</script>

{#each data as d}
  <ul>
    <li class="todo" class:done={d.done} class:highlight={d.new}>
      {@render row(d)}
    </li>
  </ul>
{/each}

<style>
  ul {
    list-style: none;
    padding: 0;
  }

  .todo {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 0.5em 0;
    padding: 1em;
    transition: box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .todo:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .highlight {
    animation: fadeHighlight 3s forwards;
  }

  .done {
    opacity: 0.4;
  }
</style>
