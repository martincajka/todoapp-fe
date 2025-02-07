<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$btns/Button.svelte";

  let email = "";

  function handleResetPassword() {
    // Your forgot password logic here (e.g., sending a reset email)
    console.log("Resetting password for:", email);
    // After successful reset request (or mock success), maybe redirect to login
    // goto('/login'); // Uncomment when you have actual functionality
    alert("Password reset email sent (mock)."); // Replace with real logic
  }
</script>

<div class="forgot-password-container">
  <div class="forgot-password-box">
    <h2>Forgot Password</h2>

    <div class="input-group">
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} required />
    </div>

    <Button type="submit" fullWidth>Reset password</Button>

    <div class="link-container">
      <a href="/login" on:click|preventDefault={() => goto("/login")}
        >Back to Login</a
      >
    </div>
  </div>
</div>

<style>
  /* Inherit styles from login page for consistency */
  .forgot-password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow: hidden;
  }

  .forgot-password-box {
    background-color: var(--color-surface);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 400px;
    color: var(--color-text);
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

  input[type="email"] {
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
