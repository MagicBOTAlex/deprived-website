<!-- If url contains "hideOnPrint" param, then detect if start printing then hide elements -->
<script lang="ts">
  import "../app.css";
  import fly from "@e/fly";
  import MediaQuery from "svelte-media-queries";
  import Dices from "@lucide/svelte/icons/dices";
  import re from "@ts/Redaction/Redactor";
  let hideOnPrint: boolean = $state(false);

  let { children } = $props();

  import DeprivedLogo from "$lib/images/DeprivedLogo.svelte";
  import HamburgerMenuIcon from "$lib/images/HamburgerMenuIcon.svelte";

  const footerCollapseThreshold: string = "40rem";
  const headerCollapseThreshold: string = "40rem";
  let footerCollapse: boolean;
  let isMobile: boolean = $state(false);

  let navbarHidden: boolean = $state(true);
  let isDevUrl = $state(false);

  function resetNavBar() {
    navbarHidden = true;
  }

  function handleUrlParams() {
    const params = new URLSearchParams(window.location.search);
    hideOnPrint = params.get("hideOnPrint") === "1";
    if (!!params.get("key")) {
      localStorage.setItem("key", params.get("key")!);
    }
  }

  import { afterNavigate } from "$app/navigation";
  afterNavigate(() => {
    handleUrlParams();
  });

  import onMount from "@e/onMount";
  import Zooter from "./comps/Zooter.svelte";
  import CustomScrollBar from "./comps/CustomScrollBar.svelte";

  onMount(async () => {
    handleUrlParams();

    const lock = document.createElement("meta");
    lock.name = "darkreader-lock";
    document.head.appendChild(lock);

    await re.TryGetUnredacter();
    const { hostname } = window.location;
    isDevUrl = hostname.includes("dev") || hostname.includes("localhost");
  });

  function nextTheme() {
    let theme: string | null = null;

    if (typeof localStorage !== "undefined") {
      theme = localStorage.getItem("theme");
    }

    const themesArr = (window as any).AvailableThemes;
    let nextTheme = "dark";
    if (
      theme == "null" ||
      theme == "undefined" ||
      theme == undefined ||
      theme == null
    ) {
    } else {
      nextTheme = themesArr[(1 - -themesArr.indexOf(theme)) % themesArr.length];
    }

    console.log("Slecting: " + nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  }
</script>

{#snippet SwitchThemeButton()}
  <div
    class="tooltip tooltip-bottom grid place-content-center"
    data-tip="Switch theme"
  >
    <button class="cursor-pointer" onclick={nextTheme}> <Dices /></button>
  </div>
{/snippet}

<!-- Detect mobile -->
<MediaQuery
  query="(max-width: {footerCollapseThreshold})"
  bind:matches={footerCollapse}
/>
<MediaQuery
  query="(max-width: {headerCollapseThreshold})"
  bind:matches={isMobile}
/>

<CustomScrollBar
  overflowX="hidden"
  overflowY="auto"
  Class="h-screen {hideOnPrint ? 'hide-on-print' : ''}"
  requireAbsolute={true}
  hideOnMobile={true}
>
  <div class="flex flex-col justify-between min-h-screen bg-base-200 p-0">
    <header class="{hideOnPrint ? 'hide-on-print' : ''} bg-base-300">
      <div class="nav-bar pr-4">
        <!-- TODO: Make this one element instead of this weird ass if statement -->
        {#if !isMobile}
          <div class="desktop items-center">
            <a href="/" class="nav-head">
              <DeprivedLogo
                Class="fill-base-content p-2"
                Style="width: 3.5rem; height: auto;"
              />
              <!-- <h3 id="logo-text">The Deprived Devs</h3> -->
            </a>
            <div class="nav-spacer" />

            {@render SwitchThemeButton()}

            <a
              href="/cv?hideOnPrint=1"
              target="_blank"
              style="width: 7.5rem;"
              class="text-center justify-center text-md"
              >{$re?.nick ?? "Alex"}'s CV</a
            >
            <!-- <a href="/tools" style="width: 7.5rem;" class="text-center">Tools</a> -->
            <!-- <a href="https://botalex.itch.io/" target="_blank">Games</a> -->
            <!-- <a href="/posts">Blog</a>
                    <a href="/about">About</a> -->
          </div>
        {:else}
          <div class="collapsed shadow-xl">
            <a onclick={resetNavBar} href="/" class="nav-head">
              <DeprivedLogo
                Class="fill-base-content p-2"
                Style="width: 3.5rem; height: auto;"
              />
              <!-- <h3 id="logo-text">The Deprived Devs</h3> -->
            </a>
            <div class="nav-spacer" />
            {@render SwitchThemeButton()}
            <div class="px-1"></div>
            <button
              id="toggle-nav"
              onclick={() => {
                navbarHidden = !navbarHidden;
                console.log(navbarHidden);
              }}
            >
              <HamburgerMenuIcon Class="fill-base-content" />
            </button>
          </div>
          {#if !navbarHidden}
            <div class="nav-list" transition:fly={{ y: -25, duration: 350 }}>
              <!-- <a onclick={resetNavBar} href="/">Home</a> -->
              <!-- <a -->
              <!--   onclick={resetNavBar} -->
              <!--   href="https://botalex.itch.io/" -->
              <!--   target="_blank">Games</a -->
              <!-- > -->
              <a href="/cv?hideOnPrint=1" target="_blank" class="justify-center"
                >{$re?.nick ?? "Alex"}'s CV</a
              >
              <!-- <a onclick={resetNavBar} href="/posts">Blog</a>
                        <a onclick={resetNavBar} href="/about">About</a> -->
            </div>
          {/if}
        {/if}
      </div>
    </header>

    <div class="flex-1">
      <!-- Page content -->
      {@render children?.()}
    </div>

    <Zooter bind:hideOnPrint />
  </div>
</CustomScrollBar>

{#if hideOnPrint}
  <div class="flex-1 hide-if-not-print">
    <!-- Page content -->
    {@render children?.()}
  </div>
{/if}

{#if footerCollapse}
  <style>
    .about-container {
      flex-direction: column;
      justify-content: center !important;
      gap: 25px;
    }
  </style>
{/if}

<style>
  /* Nav bar. */
  header {
    display: flex;
    justify-content: center;
  }

  .back-to-top {
    opacity: 1;
    right: 16px;
    user-select: none;
    bottom: 80px;
  }

  header a {
    text-decoration: none;
  }

  .nav-bar {
    width: 100%;
    max-width: 1400px;
  }

  .desktop {
    width: 100%;
    display: flex;
    gap: 30px;
  }

  .collapsed {
    width: 100%;
    display: flex;
  }

  #toggle-nav {
    background: transparent;
    border: none;
  }

  .nav-list {
    display: flex;
    flex-direction: column;
    gap: 10px;

    align-items: center;
  }

  .nav-head {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nav-spacer {
    width: 100%;
  }

  header a {
    display: flex;
    align-items: center;

    font-size: 22px;
    font-family: var(--title-font);
    color: oklch(var(--bc));
  }
  a:hover {
    filter: brightness(130%);
  }
</style>
