<script lang="ts">
  import onMount from "@e/onMount";
  import onDestroy from "@e/onDestroy";
  import MediaQuery from "svelte-media-queries";

  // Public props
  export let overflowX: "auto" | "scroll" | "hidden" = "hidden";
  export let overflowY: "auto" | "scroll" | "hidden" = "auto";

  export let hideOnMobile = false; // True if hide scrollbar when mobile detected

  // Visual tuning
  export let thickness = 12; // px
  export let padding = 0; // px, space around track inside the overlay
  export let minThumb = 10; // px
  export let contentPadding = 0; // px, inner padding for your content
  export let Class = ""; // Extra classes for the scrollbar

  // Styling (customize freely)
  export let trackStyle = "";
  export let trackClass = "";
  export let trackOpacity = 0.55;

  export let thumbClass =
    "bg-black opacity-50 border-white text-xs text-center text-opacity-50 overflow-hidden flex items-center text-nowrap justify-center";
  export let thumbLength = 20; // px. doesn't work for some reason, idk

  export let requireAbsolute = false; // Some needs absolute for some reason. idk

  export let scrollThumbText =
    "-------------------------------------------------------------------------------------------------------------------------------Scroll-------------------------------------------------------------------------------------------------------------------------------";

  let hideOnPrint = false;

  let viewport: HTMLDivElement;
  let vBar: HTMLDivElement; // vertical bar container
  let hBar: HTMLDivElement; // horizontal bar container
  let vThumb: HTMLDivElement;
  let hThumb: HTMLDivElement;

  let showBarY = false;
  let showBarX = false;
  let isMobile = false;

  // ——— utils
  const sMaxY = () =>
    Math.max(0, viewport.scrollHeight - viewport.clientHeight);
  const sMaxX = () => Math.max(0, viewport.scrollWidth - viewport.clientWidth);
  const tMaxY = () =>
    Math.max(0, (vBar?.clientHeight || 0) - (vThumb?.offsetHeight || 0));
  const tMaxX = () =>
    Math.max(0, (hBar?.clientWidth || 0) - (hThumb?.offsetWidth || 0));

  function updateVisibility() {
    showBarY =
      overflowY !== "hidden" &&
      viewport.scrollHeight > viewport.clientHeight &&
      !(hideOnMobile && isMobile);
    showBarX =
      overflowX !== "hidden" &&
      viewport.scrollWidth > viewport.clientWidth &&
      !(hideOnMobile && isMobile);
  }

  function updateVerticalThumb() {
    if (!vThumb || !vBar) return;
    const ratio = viewport.clientHeight / viewport.scrollHeight;
    const h = Math.max(minThumb, Math.round(ratio * vBar.clientHeight));
    vThumb.style.height = `${h}px`;

    const top = sMaxY() ? (viewport.scrollTop / sMaxY()) * tMaxY() : 0;
    vThumb.style.top = `${top}px`;

    vThumb.setAttribute("aria-valuemin", "0");
    vThumb.setAttribute("aria-valuemax", String(sMaxY()));
    vThumb.setAttribute("aria-valuenow", String(viewport.scrollTop));
  }

  function updateHorizontalThumb() {
    if (!hThumb || !hBar) return;
    const ratio = viewport.clientWidth / viewport.scrollWidth;
    const w = Math.max(minThumb, Math.round(ratio * hBar.clientWidth));
    hThumb.style.width = `${w}px`;

    const left = sMaxX() ? (viewport.scrollLeft / sMaxX()) * tMaxX() : 0;
    hThumb.style.left = `${left}px`;

    hThumb.setAttribute("aria-valuemin", "0");
    hThumb.setAttribute("aria-valuemax", String(sMaxX()));
    hThumb.setAttribute("aria-valuenow", String(viewport.scrollLeft));
  }

  function updateAll() {
    updateVisibility();
    updateVerticalThumb();
    updateHorizontalThumb();
  }

  // Drag state
  let draggingV = false;
  let draggingH = false;
  let dragStart = { x: 0, y: 0, scrollLeft: 0, scrollTop: 0 };
  let pointerIdV: number | null = null;
  let pointerIdH: number | null = null;

  function onVPointerDown(e: PointerEvent) {
    draggingV = true;
    pointerIdV = e.pointerId;
    vThumb.setPointerCapture(e.pointerId);
    dragStart = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: viewport.scrollLeft,
      scrollTop: viewport.scrollTop,
    };
    e.preventDefault();
  }
  function onVPointerMove(e: PointerEvent) {
    if (!draggingV) return;
    const dy = e.clientY - dragStart.y;
    const pixelsPerThumb = sMaxY() / Math.max(1, tMaxY());
    viewport.scrollTop = Math.min(
      sMaxY(),
      Math.max(0, dragStart.scrollTop + dy * pixelsPerThumb),
    );
  }
  function endVDrag(e: PointerEvent) {
    if (!draggingV) return;
    draggingV = false;
    if (pointerIdV != null) {
      try {
        vThumb.releasePointerCapture(pointerIdV);
      } catch {}
      pointerIdV = null;
    }
  }

  function onHPointerDown(e: PointerEvent) {
    draggingH = true;
    pointerIdH = e.pointerId;
    hThumb.setPointerCapture(e.pointerId);
    dragStart = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: viewport.scrollLeft,
      scrollTop: viewport.scrollTop,
    };
    e.preventDefault();
  }
  function onHPointerMove(e: PointerEvent) {
    if (!draggingH) return;
    const dx = e.clientX - dragStart.x;
    const pixelsPerThumb = sMaxX() / Math.max(1, tMaxX());
    viewport.scrollLeft = Math.min(
      sMaxX(),
      Math.max(0, dragStart.scrollLeft + dx * pixelsPerThumb),
    );
  }
  function endHDrag(e: PointerEvent) {
    if (!draggingH) return;
    draggingH = false;
    if (pointerIdH != null) {
      try {
        hThumb.releasePointerCapture(pointerIdH);
      } catch {}
      pointerIdH = null;
    }
  }

  // Track clicks: jump to position
  function onVTrackPointerDown(e: PointerEvent) {
    if (e.target === vThumb) return;
    const rect = vBar.getBoundingClientRect();
    const y = e.clientY - rect.top - vThumb.offsetHeight / 2;
    const clamped = Math.min(tMaxY(), Math.max(0, y));
    viewport.scrollTop = (clamped / Math.max(1, tMaxY())) * sMaxY();
  }
  function onHTrackPointerDown(e: PointerEvent) {
    if (e.target === hThumb) return;
    const rect = hBar.getBoundingClientRect();
    const x = e.clientX - rect.left - hThumb.offsetWidth / 2;
    const clamped = Math.min(tMaxX(), Math.max(0, x));
    viewport.scrollLeft = (clamped / Math.max(1, tMaxX())) * sMaxX();
  }

  // Keyboard on thumbs
  function onVKeyDown(e: KeyboardEvent) {
    const step = 40;
    const page = Math.max(120, Math.floor(viewport.clientHeight * 0.9));
    switch (e.key) {
      case "ArrowDown":
        viewport.scrollBy({ top: step });
        e.preventDefault();
        break;
      case "ArrowUp":
        viewport.scrollBy({ top: -step });
        e.preventDefault();
        break;
      case "PageDown":
        viewport.scrollBy({ top: page });
        e.preventDefault();
        break;
      case "PageUp":
        viewport.scrollBy({ top: -page });
        e.preventDefault();
        break;
      case "Home":
        viewport.scrollTo({ top: 0 });
        e.preventDefault();
        break;
      case "End":
        viewport.scrollTo({ top: sMaxY() });
        e.preventDefault();
        break;
    }
  }
  function onHKeyDown(e: KeyboardEvent) {
    const step = 40;
    const page = Math.max(120, Math.floor(viewport.clientWidth * 0.9));
    switch (e.key) {
      case "ArrowRight":
        viewport.scrollBy({ left: step });
        e.preventDefault();
        break;
      case "ArrowLeft":
        viewport.scrollBy({ left: -step });
        e.preventDefault();
        break;
      case "PageDown":
        viewport.scrollBy({ left: page });
        e.preventDefault();
        break;
      case "PageUp":
        viewport.scrollBy({ left: -page });
        e.preventDefault();
        break;
      case "Home":
        viewport.scrollTo({ left: 0 });
        e.preventDefault();
        break;
      case "End":
        viewport.scrollTo({ left: sMaxX() });
        e.preventDefault();
        break;
    }
  }

  let ro: ResizeObserver;

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    hideOnPrint = params.get("hideOnPrint") === "1";

    const onScroll = () => {
      updateVerticalThumb();
      updateHorizontalThumb();
    };
    viewport.addEventListener("scroll", onScroll, { passive: true });

    ro = new ResizeObserver(() => updateAll());
    ro.observe(viewport);
    if (viewport.firstElementChild instanceof HTMLElement) {
      ro.observe(viewport.firstElementChild);
    }

    // Global pointer end (in case drag ends outside)
    const endAll = () => {
      draggingV = draggingH = false;
    };
    window.addEventListener("pointerup", endAll);

    // Initial paint
    queueMicrotask(updateAll);

    return () => {
      viewport.removeEventListener("scroll", onScroll as any);
      window.removeEventListener("pointerup", endAll);
    };
  });

  onDestroy(() => {
    ro?.disconnect();
  });

  // Padding for content so the overlay bars don’t cover it
  $: pr = contentPadding + (showBarY ? thickness + padding * 2 : 0);
  $: pb = contentPadding + (showBarX ? thickness + padding * 2 : 0);
</script>

<MediaQuery query="(max-width: 40rem)" bind:matches={isMobile} />

<!-- svelte-ignore element_invalid_self_closing_tag -->
<!-- svelte-ignore a11y_role_has_required_aria_props -->

<!-- Wrapper -->
<div
  class="relative {overflowY == 'hidden'
    ? ''
    : 'overflow-y-hidden'} {overflowX == 'hidden'
    ? ''
    : 'overflow-x-hidden'} {Class}"
>
  <!-- The real, native scrolling area (we hide its native scrollbar) -->
  <div
    bind:this={viewport}
    class="csb-viewport {requireAbsolute
      ? 'absolute'
      : ''} inset-0 overflow-auto focus:outline-none"
    style="
      padding: {contentPadding}px {pr}px {pb}px {contentPadding}px;
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
    "
  >
    <div class="min-w-0 min-h-0">
      <slot />
    </div>
  </div>

  <!-- Vertical overlay bar (mirrors x-scroll structure) -->
  {#if showBarY}
    <div
      bind:this={vBar}
      class="absolute bg-base-200 {hideOnPrint ? 'hide-on-print' : ''} "
      style="
      top: {padding}px;
      bottom: {padding}px;
      right: {padding}px;
      width: {thickness}px;
      pointer-events: none;
    "
      aria-hidden="false"
    >
      <div class="absolute inset-0 corner-border-container">
        <div
          class="transition-opacity {trackClass} w-full h-full"
          style="
          pointer-events: auto;
          {trackStyle}
        "
          on:pointerdown={onVTrackPointerDown}
        />
      </div>

      <div
        bind:this={vThumb}
        role="scrollbar"
        aria-orientation="vertical"
        tabindex="0"
        class={`absolute border-y-2 left-0 right-0 rounded-none cursor-grab active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500 ${thumbClass}`}
        style="height: {thumbLength}px; pointer-events: auto; touch-action: none;"
        on:pointerdown={onVPointerDown}
        on:pointermove={onVPointerMove}
        on:pointerup={endVDrag}
        on:pointercancel={endVDrag}
        on:keydown={onVKeyDown}
      >
        <span class="rotate-90">
          {scrollThumbText}
        </span>
      </div>
    </div>
  {/if}

  <!-- Horizontal overlay bar -->
  {#if showBarX}
    <div
      bind:this={hBar}
      class="absolute {hideOnPrint ? 'hide-on-print' : ''} "
      style="
        left: {padding}px;
        right: {padding}px;
        bottom: {padding}px;
        height: {thickness}px;
        pointer-events: none;
      "
      aria-hidden="false"
    >
      <div class="absolute inset-0 corner-border-container">
        <div
          class="transition-opacity {trackClass} h-full"
          style="
          pointer-events: auto;
          {trackStyle}
        "
          on:pointerdown={onHTrackPointerDown}
        />
      </div>
      <div
        bind:this={hThumb}
        role="scrollbar"
        aria-orientation="horizontal"
        tabindex="0"
        class={`absolute border-x-2 top-0 bottom-0 rounded-none cursor-grab active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500 ${thumbClass}`}
        style="width: {thumbLength}px; pointer-events: auto; touch-action: none;"
        on:pointerdown={onHPointerDown}
        on:pointermove={onHPointerMove}
        on:pointerup={endHDrag}
        on:pointercancel={endHDrag}
        on:keydown={onHKeyDown}
      >
        {scrollThumbText}
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  /* Hide the native scrollbars while keeping native scrolling */
  :global(.csb-viewport) {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE/Edge legacy */
  }
  :global(.csb-viewport::-webkit-scrollbar) {
    width: 0;
    height: 0; /* WebKit */
  }
  .corner-border-container {
    --length: 5px;
    --width: 1px;
    --line-color: #eeeeee;
    --background-color: #0002;
    background-color: var(--background-color);
    background-image:
      linear-gradient(var(--line-color), var(--line-color)),
      linear-gradient(var(--line-color), var(--line-color)),
      linear-gradient(var(--line-color), var(--line-color)),
      linear-gradient(var(--line-color), var(--line-color)),
      linear-gradient(var(--line-color), var(--line-color)),
      linear-gradient(var(--line-color), var(--line-color)),
      linear-gradient(var(--line-color), var(--line-color)),
      linear-gradient(var(--line-color), var(--line-color));
    background-size:
      var(--length) var(--width),
      var(--width) var(--length),
      var(--length) var(--width),
      var(--width) var(--length),
      var(--length) var(--width),
      var(--width) var(--length),
      var(--length) var(--width),
      var(--width) var(--length);
    background-position:
      top left,
      top left,
      top right,
      top right,
      bottom right,
      bottom right,
      bottom left,
      bottom left;
    background-repeat: no-repeat;

    border-radius: 0;

    & > div {
      background: repeating-linear-gradient(
        -45deg,
        #0000,
        #0000 15px,
        #fff2 10px 20px
      );
    }
  }
</style>
