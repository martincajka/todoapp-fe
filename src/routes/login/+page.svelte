<script>
  // import { auth } from './firebaseConfig'; // Or your auth setup
  // import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth'; // Example using Firebase
  import { goto } from "$app/navigation"; // For SvelteKit routing

  let email = "";
  let password = "";
  let error = null;
  let loading = false;

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, redirect to protected page
  //     goto('/protected-page'); // Replace with your route
  //   }
  // });

  async function handleFormLogin() {
    loading = true;
    error = null; // Clear any previous errors
    try {
      // Replace with your actual form login logic (e.g., API call)
      // Example with Firebase:
      // await signInWithEmailAndPassword(auth, email, password);

      // Mock success (replace with your actual login)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call delay
      goto("/app");
    } catch (err) {
      error = err.message; // Or a more user-friendly message
      console.error("Login error:", err);
    } finally {
      loading = false;
    }
  }

  async function handleGoogleLogin() {
    // loading = true;
    // error = null;
    // try {
    //   const provider = new GoogleAuthProvider();
    //   await signInWithPopup(auth, provider);
    // } catch (err) {
    //   error = err.message;
    //   console.error("Google login error:", err);
    // } finally {
    //   loading = false;
    // }
  }

  function handleForgotPassword() {
    // Navigate to your "Forgot Password" page
    goto("/forgot-password");
  }
</script>

<div class="login-container">
  <div class="login-box">
    <h2>Login</h2>

    {#if error}
      <p class="error-message">{error}</p>
    {/if}

    <div class="input-group">
      <label for="email">Email:</label>
      <input type="email" id="email" bind:value={email} required />
    </div>

    <div class="input-group">
      <label for="password">Password:</label>
      <input type="password" id="password" bind:value={password} required />
    </div>

    <button on:click={handleFormLogin} disabled={loading}>
      {#if loading}
        Logging in...
      {:else}
        Login
      {/if}
    </button>

    <button
      class="google-login-button"
      on:click={handleGoogleLogin}
      disabled={loading}
    >
      {#if loading}
        Logging in...
      {:else}
        Login with Google
      {/if}
    </button>

    <div class="forgot-password-link">
      <a href="/forgot-password" on:click|preventDefault={handleForgotPassword}
        >Forgot Password?</a
      >
    </div>
  </div>
</div>

<style>
  /* Basic styling - customize as needed */
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* Ensure full viewport height */
    background-color: #f0f0f0; /* Example background */
  }

  .login-box {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 350px; /* Adjust width as needed */
  }

  .input-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  button {
    background-color: #007bff; /* Example color */
    color: white;
    padding: 0.8rem 1.2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .error-message {
    color: red;
    margin-top: 0.5rem;
  }

  .google-login-button {
    background-color: #4285f4; /* Google blue */
    color: white;
    /* Add Google icon if desired */
  }

  .forgot-password-link {
    margin-top: 1rem;
    text-align: center;
  }
</style>
