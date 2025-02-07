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
  /* Content fade-in animation */
  .landing-container {
    background: linear-gradient(
      135deg,
      var(--color-primary) 0%,
      var(--color-background) 100%
    );
    color: #fff;
    overflow: hidden;
    margin: 0; /* Remove default margin */
    padding: 2rem;
  }

  .landing-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    opacity: 0;
    transform: translateY(1rem);
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  }

  .landing-content.show {
    opacity: 1;
    transform: translateY(0);
  }

  .landing-content h1 {
    margin-bottom: 1rem;
  }

  .landing-content p {
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
    background-color: var(--slate-50);
    color: var(--color-primary);
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      transform 0.2s ease;
  }

  /* Hover and active states */
  .cta-buttons button:hover {
    background-color: var(--slate-200);
  }
  .cta-buttons button:active {
    transform: scale(0.95);
  }
</style>
