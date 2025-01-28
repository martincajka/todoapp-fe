<script>
  import { goto } from "$app/navigation";

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

    <button on:click={handleResetPassword}>Reset Password</button>

    <div class="login-link">
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
    background: linear-gradient(to bottom right, #6366f1, #ec4899);
    color: white;
    font-family: "Arial", sans-serif;
    overflow: hidden;
  }

  .forgot-password-box {
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

  input[type="email"] {
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
    width: 100%;
  }

  button:hover {
    background-color: #5258da;
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
</style>
