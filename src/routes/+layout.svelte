<script>
  import "../app.css";
  let { children } = $props();

  let locale = $state("en");
  let isOpen = $state(false);

  function handleClickOutside(event) {
    const dropdown = document.querySelector(".language-switcher");
    if (dropdown && !dropdown.contains(event.target)) {
      isOpen = false;
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<nav class="navbar">
  <div class="nav-brand">TodoApp</div>
  <div class="nav-items">
    <div class="language-switcher">
      <button class="dropdown-trigger" onclick={() => (isOpen = !isOpen)}>
        {locale?.toUpperCase() || "EN"} ▼
      </button>
      {#if isOpen}
        <div class="dropdown-menu">
          <button
            class="dropdown-item"
            class:active={locale === "en"}
            onclick={() => (locale = "en")}
          >
            English
          </button>
          <button
            class="dropdown-item"
            class:active={locale === "sk"}
            onclick={() => (locale = "sk")}
          >
            Slovensky
          </button>
        </div>
      {/if}
    </div>
  </div>
</nav>

{@render children()}

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .nav-brand {
    font-size: 1.5rem;
    font-weight: 600;
    color: #6366f1;
    font-family: "Poppins", sans-serif;
  }

  .language-switcher {
    position: relative;
  }

  .dropdown-trigger {
    padding: 0.5rem 1rem;
    border: 1px solid #6366f1;
    background: transparent;
    color: #6366f1;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .dropdown-trigger:hover {
    background: #6366f1;
    color: white;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    background: white;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    animation: slideDown 0.2s ease;
  }

  .dropdown-item {
    display: block;
    width: 100%;
    padding: 0.75rem 1.5rem;
    border: none;
    background: transparent;
    color: #333;
    text-align: left;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .dropdown-item:hover {
    background: #f3f4f6;
  }

  .dropdown-item.active {
    color: #6366f1;
    background: #f0f1ff;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
