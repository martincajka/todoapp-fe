<script>
  let { data, row } = $props();
</script>

{#each data as d}
  {@render row(d)}
{/each}

<style>
</style>
