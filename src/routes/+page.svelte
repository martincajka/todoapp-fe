<script>
  import { goto } from "$app/navigation"; // For SvelteKit routing

  // Optional: Add some animations or transitions for a more polished look
  let showContent = false;
  setTimeout(() => (showContent = true), 500); // Delay content reveal
</script>

<div class="landing-container">
  <div class="landing-content" class:show={showContent}>
    <h1>Your Awesome ToDo App</h1>
    <p>
      Organize your tasks, track your progress, and achieve your goals with our
      intuitive and powerful ToDo app. Get started today and experience the
      difference!
    </p>
    <div class="cta-buttons">
      <button on:click={() => goto("/login")}>Login</button>
      <button on:click={() => goto("/register")}>Register</button>
    </div>
  </div>
</div>

<style>
  /* Container with a modern gradient background */
  .landing-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
    color: #fff;
    font-family: "Roboto", sans-serif; /* Example modern font */
    overflow: hidden;
    margin: 0; /* Remove default margin */
    padding: 0;
  }

  /* Content fade-in animation */
  .landing-content {
    max-width: 600px;
    text-align: center;
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.6s ease,
      transform 0.6s ease;
  }
  .landing-content.show {
    opacity: 1;
    transform: translateY(0);
  }

  /* Headline styling */
  .landing-content h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  /* Paragraph styling */
  .landing-content p {
    font-size: 1.125rem;
    line-height: 1.5;
    margin-bottom: 2rem;
  }

  /* Button group */
  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  /* Modern button styling */
  .cta-buttons button {
    background-color: #fff;
    color: #6366f1;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    font-weight: 500;
    transition:
      background-color 0.3s ease,
      transform 0.2s ease;
  }

  /* Hover and active states */
  .cta-buttons button:hover {
    background-color: #f3f3f3;
  }
  .cta-buttons button:active {
    transform: scale(0.95);
  }
</style>
