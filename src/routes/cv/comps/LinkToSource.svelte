<script lang="ts">
  import svelteLogo from "$lib/svelteLogos/svelte-logo-cutout.svg";
  import onMount from "@src/optimizers/onMount";
  import re from "@src/ts/Redaction/Redactor";
</script>

<div class="container">
  <div class="flex justify-center">
    <div class="corner-border-container p-1 m-1">
      <div class="flex">
        This CV was made using html, css and <a
          class="grid place-content-center"
          href="https://kit.svelte.dev/"
          ><img src={svelteLogo} class="w-2 h-2" alt="SvelteKit logo" /></a
        >
      </div>
      Sources:
      <a
        href={$re?.cv.sourceLink ??
          "https://www.youtube.com/watch?v=0TaNezk4wNQ"}>CV source code</a
      >
      and
      <a href="/cv?hideOnPrint=1">My Website</a>
    </div>
  </div>
</div>

<style lang="scss">
  .container {
    z-index: 1;

    font-size: 0.5rem;

    //white-space: nowrap;

    * a {
      padding-left: 1mm;
      padding-right: 1mm;

      text-decoration: underline;
    }

    div:nth-child(2) {
      padding-bottom: 2mm;
    }
  }
</style>
