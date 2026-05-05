<script lang="ts">
  export let logo: string;
  export let logoWidths: string = "10%";

  export let fontSize: string = "3mm";
  export let lineHeight: string = "3.1mm";

  import env, { initEnv } from "@src/ts/EnvHandler";

  import onMount from "@e/onMount";
  onMount(() => {
    imageCaption = logo.split(/(\\|\/)/g).pop();
    initEnv();
  });

  let imageCaption: undefined | string; // Not a high piority, you get the file name and thats it
</script>

<div class="container">
  <img
    src={logo.replace("[PB]", env.POCKETBASE_URL) ?? ""}
    class="bg-white w-10 h-10 object-contain rounded shadow"
    alt={imageCaption}
    width={logoWidths}
  />
  <div style="line-height: {lineHeight};">
    <span style="font-size: {fontSize};">
      <slot />
    </span>
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    justify-items: start;

    & > div {
      padding-left: 3mm;

      text-align: start;
    }
  }
</style>
