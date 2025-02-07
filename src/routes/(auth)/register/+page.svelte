<script lang="ts">
  import Button from "$btns/Button.svelte";
  let { data, form } = $props();
</script>

<div class="registration-container">
  <div class="registration-box">
    <h2>Register</h2>
    <form class="form-content" method="POST">
      <div class="input-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form?.email ?? ""}
          required
        />
      </div>

      <div class="input-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required />
      </div>

      <div class="input-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
        />
      </div>
      <div class="message-container">
        {#if form?.success !== undefined}
          <div
            class={form.success === true ? "success-message" : "error-message"}
          >
            {form.message}
          </div>
        {/if}
      </div>
      <Button type="submit" fullWidth>Register</Button>
    </form>

    <div class="link-container">
      Already have an account? <a href="/login">Login</a>
    </div>
  </div>
</div>

<style>
  /* Inherit styles from landing page for consistency */
  .registration-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow: hidden;
  }

  .registration-box {
    background-color: var(--color-surface);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 400px;
    color: var(--color-text);
  }

  .form-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .input-group {
    margin-bottom: 0;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .message-container {
    min-height: 64px; /* Fixed height for message area */
    margin-bottom: 1rem;
    align-items: center;
    justify-content: center;
  }

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: var(--color-text-header);
  }

  .input-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 1rem;
  }

  .link-container {
    margin-top: 1rem;
    text-align: center;
    color: var(--color-primary);
  }

  .success-message {
    background-color: var(--color-success);
    color: var(--color-success-text);
    padding: 1rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1rem;
  }

  .error-message {
    background-color: var(--color-danger);
    color: var(--color-danger-text);
    padding: 1rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 0.875rem;
  }
</style>
