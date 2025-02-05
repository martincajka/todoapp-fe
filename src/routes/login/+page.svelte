<script lang="ts">
  import { page } from "$app/stores";
  import Button from "$btns/Button.svelte";

  export let form;

  let email = $page.url.searchParams.get("email") || "";
  let verified = $page.url.searchParams.get("verified") || false;
  let password = "";
  $: errorMessage = form?.error;
</script>

<div class="login-container">
  <div class="login-box">
    <h2>Login</h2>

    {#if verified}
      <div class="success-message">
        Registration successfully verified! Please log in.
      </div>
    {/if}

    {#if errorMessage}
      <div class="error-message">{errorMessage}</div>
    {/if}
    <form method="POST">
      <div class="input-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          bind:value={email}
          required
        />
      </div>

      <div class="input-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          bind:value={password}
          required
        />
      </div>
      <Button type="submit" fullWidth>Login</Button>
    </form>

    <div class="forgot-password-link">
      <a href="/forgot-password">Forgot Password?</a>
    </div>

    <div class="register-link">
      Don't have an account? <a href="/register">Register</a>
    </div>
  </div>
</div>

<style>
  /* Inherit styles from registration page for consistency */
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(to bottom right, #6366f1, #ec4899);
    color: white;
    font-family: "Arial", sans-serif;
    overflow: hidden;
  }

  .login-box {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 400px;
    color: #333;
  }

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #6366f1;
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
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 1rem;
  }

  .forgot-password-link {
    margin-top: 1rem;
    text-align: center;
    color: #6366f1;
  }

  .forgot-password-link a {
    color: inherit;
    text-decoration: none;
    font-weight: 500;
  }

  .forgot-password-link a:hover {
    text-decoration: underline;
  }

  .register-link {
    /* Added class for the register link */
    margin-top: 1rem;
    text-align: center;
    color: #6366f1;
  }

  .register-link a {
    color: inherit;
    text-decoration: none;
    font-weight: 500;
  }

  .register-link a:hover {
    text-decoration: underline;
  }

  .success-message {
    background-color: #dcfce7;
    color: #166534;
    padding: 1rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1rem;
  }

  .error-message {
    background-color: #fef2f2;
    color: #b91c1c;
    padding: 1rem;
    border-radius: 6px;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 0.875rem;
  }
</style>
