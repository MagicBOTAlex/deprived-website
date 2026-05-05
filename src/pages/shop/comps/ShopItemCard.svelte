<script lang="ts">
  import type ShopItem from "@src/ts/api/classes/ShopItem";
  import ArrowBigRight from "lucide-svelte/icons/arrow-big-right";

  export let shopItem: ShopItem;

  const selectionScale = 95;
</script>

<div class="">
  <div class="relative w-48 h-48">
    <div class="corner-border-container">
      <div class="w-full h-full flex flex-col justify-end">
        <div class="flex flex-col justify-center items-center">
          <span class="text-xl font-semibold text-center w-full"
            >{shopItem.item_name}</span
          >
          <span>{@html shopItem.short_desc}</span>
        </div>
        <div class="flex justify-end p-2">
          <a
            class="btn not-hover:btn-outline btn-primary btn-square"
            href={shopItem.page_url}><ArrowBigRight /></a
          >
        </div>
      </div>
    </div>
    <div
      class="absolute"
      style:top={`${-(selectionScale - 100) / 2}%`}
      style:left={`${-(selectionScale - 100) / 2}%`}
      style:width={`${selectionScale}%`}
      style:height={`${selectionScale}%`}
    >
      <div class="w-full h-full">
        <img
          class="object-cover w-full h-full peer rounded"
          src={shopItem.preview_image}
          alt=""
        />
      </div>
    </div>
  </div>
</div>

<style>
  .corner-border-container {
    /* Controls */
    --length: 8px;
    --width: 2px;
    --line-color: #eeeeee;

    /* Sit on top of the image */
    position: absolute;
    inset: 0;
    z-index: 1;

    /* Corner lines (same 8-gradients as before) */
    background-image:
      linear-gradient(var(--line-color), var(--line-color)),
      linear-gradient(var(--line-color), var(--line-color)),
      linear-gradient(var(--line-color), var(--line-color)),
      linear-gradient(var(--line-color), var(--line-color)),
      linear-gradient(var(--line-color), var(--line-color)),
      linear-gradient(var(--line-color), var(--line-color)),
      linear-gradient(var(--line-color), var(--line-color)),
      linear-gradient(var(--line-color), var(--line-color));
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

    /* Start: invisible and a bit bigger */
    opacity: 0;
    transform: scale(1.06);
    background-color: transparent;

    /* Draw lines from 0 length */
    --x: 0;
    --y: 0;
    background-size:
      var(--x) var(--width),
      var(--width) var(--y),
      var(--x) var(--width),
      var(--width) var(--y),
      var(--x) var(--width),
      var(--width) var(--y),
      var(--x) var(--width),
      var(--width) var(--y);

    transition:
      opacity 220ms ease,
      transform 220ms ease,
      background-size 220ms ease,
      background-color 220ms ease;
  }

  /* On hover: normal size + visible + darken backdrop */
  .relative:hover .corner-border-container {
    --x: var(--length);
    --y: var(--length);
    opacity: 1;
    transform: scale(1);
    background-color: rgba(0, 0, 0, 0.65);
  }
</style>
