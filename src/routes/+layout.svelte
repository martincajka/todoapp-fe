<script lang="ts">
  import { onMount } from "svelte";
  import "../app.css";
  import Theme from "$icons/Theme.svelte";
  import IconButton from "$btns/IconButton.svelte";
  import Language from "$icons/Language.svelte";
  let { children } = $props();

  // Default theme is "light"
  let theme = "light";

  // Use onMount to access localStorage on the client side only
  onMount(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    theme = storedTheme;
    document.documentElement.setAttribute("data-theme", theme);
  });

  // Toggle between light and dark mode
  function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

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
</script>

<svelte:window on:click={handleClickOutside} />

<nav class="navbar">
  <a href="/" class="nav-brand">TodoApp</a>
  <div class="nav-items">
    <IconButton variant="ghost" onclick={toggleTheme}
      ><Theme iconStyle="medium primary" />
    </IconButton>
    <div class="language-switcher">
      <IconButton
        variant="ghost"
        iconStyle="medium primary"
        onclick={() => (isOpen = !isOpen)}
        ><Language iconStyle="medium primary" />
        {locale}
      </IconButton>
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

  .nav-items {
    display: flex;
    gap: 1rem;
  }

  .nav-brand {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text-header);
    letter-spacing: -0.02em;
  }

  .nav-brand:hover {
    text-decoration: none;
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100%);
    right: 0;
    background: var(--color-surface);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    min-width: 160px;
    animation: slideDown 0.1s ease;
  }

  .dropdown-item {
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    text-align: left;
    border: none;
    background: var(--color-surface);
    color: var(--color-text);
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .dropdown-item:hover {
    background: var(--color-primary);
    color: var(--color-text);
  }

  .dropdown-item.active {
    color: var(--color-text);
    border-left: solid;
    border-color: var(--color-primary);
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
