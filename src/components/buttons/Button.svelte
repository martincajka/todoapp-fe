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
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .primary {
    background-color: #6366f1;
    color: white;
  }

  .secondary {
    background-color: #64748b;
    color: white;
  }

  .danger {
    background-color: #ef4444;
    color: white;
  }

  .full-width {
    width: 100%;
  }

  .button:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  .primary:hover:not(:disabled) {
    background-color: #4f46e5;
  }

  .secondary:hover:not(:disabled) {
    background-color: #475569;
  }

  .danger:hover:not(:disabled) {
    background-color: #dc2626;
  }

  .button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
