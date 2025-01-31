<script lang="ts">
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
          <div class={form.success === true ? "success" : "error"}>
            {form.message}
          </div>
        {/if}
      </div>
      <button type="submit">Register</button>
    </form>

    <div class="login-link">
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
    background: linear-gradient(to bottom right, #6366f1, #ec4899);
    color: white;
    font-family: "Arial", sans-serif;
    overflow: hidden;
  }

  .registration-box {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 400px; /* Adjust width as needed */
    color: #333; /* Darker text color inside the box */
  }

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #6366f1; /* Match the gradient */
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

  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 1rem;
  }

  button {
    background-color: #6366f1;
    color: white;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      transform 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    width: 100%; /* Make the button full width */
  }

  button:hover {
    background-color: #5258da; /* Slightly darker on hover */
    transform: scale(1.02);
  }

  .login-link {
    margin-top: 1rem;
    text-align: center;
    color: #6366f1;
  }

  .login-link a {
    color: inherit;
    text-decoration: none;
    font-weight: 500;
  }

  .login-link a:hover {
    text-decoration: underline;
  }

  .message-container {
    min-height: 64px; /* Fixed height for message area */
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .success,
  .error {
    padding: 0.75rem;
    border-radius: 4px;
    width: 100%;
    text-align: center;
  }

  .success {
    background-color: #dcfce7;
    color: #166534;
  }

  .error {
    background-color: #fee2e2;
    color: #991b1b;
  }
</style>
