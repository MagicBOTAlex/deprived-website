<script lang="ts">
  import * as m from "$paraglide/messages";
  import { onMount } from "svelte";
  let motivation: string | null = "";
  onMount(() => {
    motivation = localStorage.getItem("motivation");
  });
</script>

<div class="short-profile-container">
  <div class="flex gap-1">
    {#if motivation}
      <b style="text-align:left;">Motivation</b>
    {:else}
      <b style="text-align:left;">{m["zhen.cv.flex.title"]()}</b>
      <h1
        style="font-size: 0.5rem; color: grey;"
        class="flex flex-col justify-end"
      >
        {m["zhen.cv.flex.tooltip"]()}
      </h1>
    {/if}
  </div>
  <div class="text-[0.85rem] text-left">
    {#if motivation}
      <div>{motivation}</div>
    {:else}
      {@html m["zhen.cv.flex.body"]()}
    {/if}
  </div>
</div>

<style>
  .short-profile-container {
    width: 90%;
  }

  .short-profile-container > div:first-child {
    width: 100%;

    /* Bottom border stripe*/
    border-bottom: 1mm solid black;
  }
</style>
