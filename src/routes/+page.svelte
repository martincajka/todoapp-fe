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
  /* Basic styling - customize as needed */
  .landing-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(
      to bottom right,
      #6366f1,
      #ec4899
    ); /* Example gradient */
    color: white;
    font-family: "Arial", sans-serif; /* Example font */
    overflow: hidden; /* Hide overflow for animations */
  }

  .landing-content {
    text-align: center;
    opacity: 0; /* Initially hidden for transition */
    transform: translateY(20px); /* Initially slightly below */
    transition:
      opacity 0.8s ease,
      transform 0.8s ease; /* Smooth transitions */
  }

  .landing-content.show {
    opacity: 1;
    transform: translateY(0);
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    line-height: 1.6; /* Improve readability */
    max-width: 600px; /* Limit text width for large screens */
  }

  .cta-buttons {
    display: flex;
    gap: 1rem; /* Add spacing between buttons */
  }

  button {
    background-color: white;
    color: #6366f1; /* Match the gradient */
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition:
      background-color 0.3s ease,
      color 0.3s ease,
      transform 0.2s ease; /* Button transitions */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
  }

  button:hover {
    background-color: #f0f0f0; /* Slightly lighter background on hover */
    transform: scale(1.05); /* Slight scale on hover */
  }

  /* Responsive adjustments (example) */
  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1rem;
    }

    .cta-buttons {
      flex-direction: column; /* Stack buttons vertically on smaller screens */
      align-items: center;
    }
  }
</style>
