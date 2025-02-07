<script>
  let { data, row } = $props();
</script>

<ul>
  {#each data as d}
    <li class="todo" class:done={d.done} class:highlight={d.new}>
      {@render row(d)}
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    padding: 0;
    max-width: 800px;
  }

  .todo {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 0.5rem;
    border-top: 1px solid var(--color-border);
    transition: all 0.2s ease;
  }
</style>
