<script>
  import MobileTags from "./MobileTags.svelte";
  import NameAndTag from "./NameAndTag.svelte";

  export let isMobile = false;
  export let name = "";
  export let tags = ["null"];
  export let isSnorre = false;
  export let replaced = false;

  // Shit code but who cares, if it works /shrug
</script>

<div
  class="relative bg-grid-100 border-2 border-base-100 pl-1 pr-4 rounded-md cozette max-lg:pb-2"
>
  {#if !isSnorre}
    <div class=" developersProfile {isSnorre ? 'isSnorre' : ''} pl-1 font-mono">
      <NameAndTag {name} {tags} {isMobile} />
      <slot />
      <MobileTags {tags} {isMobile} />
    </div>
  {:else}
    <div class="w-full pl-1">
      <div
        class="developersProfile absolute snorre pl-4 font-mono pointer-events-none select-none"
      >
        <pre style="font-size: {!isMobile ? 1.5 : 1.5}rem;"></pre>
        <span>
          <pre></pre>
          <pre></pre>
        </span>
        {#if isMobile}
          <pre></pre>
        {/if}
      </div>
      <div class="developersProfile snorre-overlay relative pl-1 font-mono">
        <NameAndTag name="Snorre" {tags} {isMobile} />
        <span>
          <p>
            I'm the diversity hire. <span
              class="border-b"
              style="border-image: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); border-image-slice: 1;"
              >(Gay)</span
            >
          </p>
          <!-- <p><a href="https://www.linkedin.com/in/snorrealtschul/" target="_blank" style="color:lightblue;">My website</a></p> -->
          <p>
            <a
              href="https://spoodythe.one/"
              target="_blank"
              style="color:lightblue;">My website</a
            >
          </p>
        </span>
        <MobileTags {tags} {isMobile} />
      </div>
    </div>
  {/if}
  <div
    class="{replaced
      ? ''
      : 'hidden'} replaced flex justify-center items-center h-full absolute top-0 left-0 down-0 right-0"
  >
    <div class="corner-border-container px-2">Replaced by AI¹</div>
  </div>
</div>

<style>
  .replaced {
    background: repeating-linear-gradient(
      45deg,
      #0009,
      #0009 15px,
      #000a 15px 20px
    );
  }
  .corner-border-container {
    --length: 5px;
    --width: 1px;
    --line-color: #eeeeee;
    background-color: #0008;
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
  }

  .developersProfile:not(.snorre):not(.snorre-overlay) {
    /* background-image: linear-gradient(var(--color-neutral) 33%, rgba(255,255,255,0) 0%); */
    /* background-image: linear-gradient(var(--color-neutral) 100%);
        background-position: left;
        background-size: 0.1rem 0.5rem;
        background-repeat: repeat-y; */
  }

  .snorre {
    /* border-left: dashed transparent 0.1rem;
        border-image: linear-gradient(to bottom, red, orange, yellow, green, blue, indigo, violet);
        border-image-slice: 1; */
  }

  .snorre-overlay {
    /* background-image: linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,0) 40%, var(--color-base-200) 40%); */
    /* background-position: left;
        background-size: 0.1rem 0.5rem;
        background-repeat: repeat-y; */
  }
</style>
