<script>
  import "../app.css";
  import Theme from "$icons/Theme.svelte";
  import IconButton from "$btns/IconButton.svelte";
  let { children } = $props();

  let locale = $state("en");
  let isOpen = $state(false);
  let darkMode = $state(false);

  function handleClickOutside(event) {
    const dropdown = document.querySelector(".language-switcher");
    if (dropdown && !dropdown.contains(event.target)) {
      isOpen = false;
    }
  }

  function onSelectLanguage(lang) {
    locale = lang;
    isOpen = false;
  }

  function toggleTheme() {
    darkMode = !darkMode;
    window.document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }
</script>

<svelte:window on:click={handleClickOutside} />

<nav class="navbar">
  <div class="nav-brand">TodoApp</div>
  <div class="nav-items">
    <div class="language-switcher">
      <IconButton variant="ghost" onclick={toggleTheme}
        ><Theme iconStyle="medium primary" />
      </IconButton>
      <button class="dropdown-trigger" onclick={() => (isOpen = !isOpen)}>
        {locale?.toUpperCase() || "EN"} ▼
      </button>
      {#if isOpen}
        <div class="dropdown-menu">
          <button
            class="dropdown-item"
            class:active={locale === "en"}
            onclick={() => onSelectLanguage("en")}
          >
            English
          </button>
          <button
            class="dropdown-item"
            class:active={locale === "sk"}
            onclick={() => onSelectLanguage("sk")}
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
    background: var(--color-background);
    backdrop-filter: blur(10px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
    z-index: 1000;
  }

  .nav-brand {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
    letter-spacing: -0.02em;
  }

  .dropdown-trigger {
    padding: 0.5rem 1rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    color: #4f46e5;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 500;
    font-size: 0.875rem;
  }

  .dropdown-trigger:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
    transform: translateY(-1px);
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    background: white;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    min-width: 160px;
    animation: slideDown 0.2s ease;
  }

  .dropdown-item {
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    text-align: left;
    border: none;
    background: transparent;
    color: #4b5563;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .dropdown-item:hover {
    background: #f8fafc;
    color: #4f46e5;
  }

  .dropdown-item.active {
    color: #4f46e5;
    background: #f5f3ff;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
