<script lang="ts">
  let {
    variant = "primary",
    disabled = false,
    fullWidth = false,
    class: className = "",
    children,
    ...restProps
  } = $props();
</script>

<button
  {disabled}
  class="button {variant} {fullWidth ? 'full-width' : ''} {className}"
  {...restProps}
>
  {@render children()}
</button>

<style>
  .button {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .primary {
    background-color: var(--color-primary);
    color: var(--color-primary-text);
  }

  .secondary {
    background-color: var(--color-secondary);
    color: var(--color-secondary-text);
  }

  .danger {
    background-color: var(--color-danger);
    color: var(--color-danger-text);
  }

  .ghost {
    background: transparent;
    color: var(--color-text);
    padding: 0.5rem;
    box-shadow: none;
  }

  .full-width {
    width: 100%;
  }

  .button:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  .primary:hover:not(:disabled) {
    background-color: var(--color-primary-hover);
  }

  .secondary:hover:not(:disabled) {
    background-color: var(--color-secondary-hover);
  }

  .danger:hover:not(:disabled) {
    background-color: var(--color-danger-hover);
  }

  .button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
