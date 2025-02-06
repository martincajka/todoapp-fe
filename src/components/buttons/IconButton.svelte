<script lang="ts">
  let {
    variant = "primary",
    disabled = false,
    class: className = "",
    children,
    ...restProps
  } = $props();
</script>

<button {disabled} class="button {variant} {className}" {...restProps}>
  {@render children()}
</button>

<style>
  .button {
    padding: 0.5rem 0.5rem;
    border: none;
    background: transparent;
    font-size: 0.875rem;
    box-shadow: none;
  }

  .primary {
    color: var(--color-primary);
  }

  .secondary {
    color: var(--color-secondary);
  }

  .danger {
    color: var(--color-danger);
  }

  .ghost {
    background: transparent;
    color: var(--color-text);
  }

  .full-width {
    width: 100%;
  }

  .button:hover:not(:disabled) {
    transform: scale(1.2);
  }

  .button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
