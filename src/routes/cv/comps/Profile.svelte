<script lang="ts">
  import * as m from "$paraglide/messages";
</script>

<div class="short-profile-container">
  <div class="flex gap-1 items-baseline">
    <b style="text-align:left;">{m["zhen.cv.profile.title"]()}</b>
    <div class="opacity-70 text-[0.5rem]">
      {m["zhen.cv.profile.tooltip"]()}
    </div>
  </div>
  <span>
    {m["zhen.cv.profile.long"]()}
  </span>
</div>

<style>
  .short-profile-container {
    display: grid;
    place-items: center;
    width: 90%;
  }

  .short-profile-container > div:first-child {
    width: 100%;

    /* Bottom border stripe*/
    border-bottom: 1mm solid black;
  }
</style>
