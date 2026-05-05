<script lang="ts">
  import svelteLogo from "$lib/svelteLogos/svelte-logo.png";
  import onMount from "@e/onMount";
  import onDestroy from "@e/onDestroy";
  import ArrowBigDown from "lucide-svelte/icons/arrow-big-down";
  import fly from "@e/fly";
  import re from "@ts/Redaction/Redactor";
  const buildTime = __BUILD_TIME__;

  let scrollY = 0;
  const unscrollSpeed = 100;
  let unscrollScrollDiv: HTMLDivElement;
  let totalScroll = 0;

  let unscrollInterval: number | undefined = undefined;
  let lastScrollTime = 0; // Used to have delay before unscrolling
  let isBeingTouched = false; // Phone support
  const unscrollDelay = 100;

  let isLeavingAnimating = false;

  // prevent direct scroll
  let notFirstScroll = false;

  let tranisitionOverlay: HTMLElement;

  // Function with more scroll control, by chatgpt
  function smoothScrollTo(targetY: number, duration: number = 500): void {
    const startY: number = window.scrollY;
    const diff: number = targetY - startY;

    if (duration <= 0) {
      window.scrollTo(0, targetY);
      return;
    }

    let startTime: number | null = null;

    function step(timestamp: number): void {
      if (startTime === null) startTime = timestamp;
      const time = timestamp - startTime;
      const percent = Math.min(time / duration, 1);

      // easeInOutQuad easing
      const ease =
        percent < 0.5
          ? 2 * percent * percent
          : -1 + (4 - 2 * percent) * percent;

      window.scrollTo(0, startY + diff * ease);

      if (time < duration) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  function onScroll() {
    lastScrollTime = Date.now();
    // console.log("scroll");
  }

  function onResize() {
    totalScroll = document.documentElement.scrollHeight - window.innerHeight;
  }

  onDestroy(() => {
    clearInterval(unscrollInterval);
  });

  export let hideOnPrint: boolean;
</script>

<svelte:window
  bind:scrollY
  on:scroll={() => {
    onScroll();
  }}
  on:touchstart={() => {
    isBeingTouched = true;
  }}
  on:touchend={() => {
    isBeingTouched = false;
  }}
  on:resize={onResize}
/>

<div class="{hideOnPrint ? 'hide-on-print' : ''} w-full">
  <div
    class="hidden h-64 w-full flex flex-col justify-end items-center"
    bind:this={unscrollScrollDiv}
  >
    <img
      src="/images/memes/WhatDaDog.png"
      class="w-32 h-32 object-contain"
      alt="da dog"
    />
  </div>

  <!-- About footer -->
  <div class="sticky bottom-0 flex flex-col justify-center pt-8 bg-base-300">
    <div class="flex justify-center">
      <div class="grid gap-8 sm:grid-cols-3 align-middle w-full">
        <div class="flex flex-col items-center">
          <span class="font-bold">© 2023-2025</span>
          <br />
          <span>{$re?.name ?? "BOT Alex"}</span>
          <br />
          <span>Benjamin Dreyer</span>
          <br />
          <span>Snorre Ettrup Altschul</span>
        </div>
        <div class="flex flex-col items-center">
          <h3><b>Info</b></h3>
          <!-- <a href="/" target="_blank">Recursion</a> -->
          <div class="flex justify-center">
            This website was made using <a
              class="grid place-content-center"
              target="_blank"
              href="https://kit.svelte.dev/"
            >
              <img
                class="pl-2"
                src={svelteLogo}
                style="height: 1.5rem;"
                alt="SvelteKit logo"
              /></a
            >
          </div>
          <!-- <span -->
          <!--   >Website <a -->
          <!--     href="https://git.deprived.dev/DeprivedDevs/deprived-main-website" -->
          <!--     target="_blank">source code</a -->
          <!--   ></span -->
          <!-- > -->
        </div>
        <div class="flex flex-col items-center">
          <h3><b>Contact</b></h3>
          <a href="mailto:{$re?.email ?? 'Alex@deprived.dev'}"
            >{$re?.email ?? "alex@deprived.dev"}</a
          >
          <div class="mt-2"></div>
          <!-- <a -->
          <!--   href="https://discord.gg/awatEEqc3M" -->
          <!--   target="_blank" -->
          <!--   class="social" -->
          <!-- > -->
          <!-- <span>Discord</span> -->
          <!--   <img -->
          <!--     src="/images/icons/discord.svg" -->
          <!--     class="w-8 h-8 object-contain" -->
          <!--     alt="Discord" -->
          <!--   /> -->
          <!-- </a> -->
        </div>
      </div>
    </div>
    <div
      class="flex w-full justify-center border-t border-base-100 border-dashed"
    >
      Last build: {buildTime} (+2 UTC)
    </div>
  </div>
</div>

<div
  bind:this={tranisitionOverlay}
  class="{isLeavingAnimating
    ? ''
    : 'hidden'} fixed top-0 left-0 w-screen h-screen bg-base-200"
></div>
<!-- {#if isLeavingAnimating}
{/if} -->
