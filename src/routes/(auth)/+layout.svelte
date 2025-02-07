<script lang="ts">
  import { onMount } from "svelte";
  import Theme from "$icons/Theme.svelte";
  import IconButton from "$btns/IconButton.svelte";
  import Language from "$icons/Language.svelte";
  let { children } = $props();
</script>

<div class="landing-container">
  {@render children()}
</div>

<style>
  .landing-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(
      135deg,
      var(--color-primary) 0%,
      var(--color-background) 100%
    );
    color: #fff;
    overflow: hidden;
    margin: 0; /* Remove default margin */
    padding: 0;
  }
</style>
