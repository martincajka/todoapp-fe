<script>
  import { goto } from "$app/navigation";
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

  console.log("API Base URL:", apiBaseUrl);

  let email = "";
  let password = "";
  let confirmPassword = "";
  let successMessage = "";
  let errorMessage = "";

  // Placeholder for form submission (replace with your actual logic)
  async function handleRegister(event) {
    event.preventDefault();
    // Your registration logic here
    console.log("Registering:", email, password, confirmPassword);
    const payload = { email, password, confirmPassword };
    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        successMessage = data.message;
        errorMessage = "";
        //Clear form fields
        email = "";
        password = "";
        confirmPassword = "";
      } else {
        successMessage = "";
        console.error(
          "Registration failed:",
          response.status,
          data.detail || "Unknown error"
        );
        errorMessage = data.detail || "Registration failed. Please try again.";
      }
    } catch (error) {
      errorMessage = "Network error occurred";
      console.error("Request error:", error);
    }
  }
</script>

<div class="registration-container">
  <div class="registration-box">
    <h2>Register</h2>
    <form
      method="POST"
      action={`${apiBaseUrl}/api/auth/register`}
      enctype="application/json"
      on:submit={handleRegister}
    >
      <div class="input-group">
        <label for="email">Email:</label>
        <input type="email" id="email" bind:value={email} required />
      </div>

      <div class="input-group">
        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={password} required />
      </div>

      <div class="input-group">
        <label for="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          bind:value={confirmPassword}
          required
        />
      </div>
      {#if successMessage}
        <div class="success">{successMessage}</div>
      {/if}
      {#if errorMessage}
        <div class="error">{errorMessage}</div>
      {/if}
      <button on:click={handleRegister}>Register</button>
    </form>

    <div class="login-link">
      Already have an account? <a
        href="/login"
        on:click|preventDefault={() => goto("/login")}>Login</a
      >
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
  .success {
    background-color: #d1f5d3;
    color: #0f5132;
    padding: 0.5rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  .error {
    background-color: #f8d7da;
    color: #842029;
    padding: 0.5rem;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
</style>
