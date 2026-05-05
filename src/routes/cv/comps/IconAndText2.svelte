<script lang="ts">
  export let logo: string;
  export let logoWidths: string = "35%";

  import onMount from "@e/onMount";
  import { env, initEnv } from "@src/ts/EnvHandler";
  onMount(() => {
    imageCaption = logo.split(/(\\|\/)/g).pop();
    initEnv();
  });

  let imageCaption: undefined | string; // Not a high piority, you get the file name and thats it
</script>

<div class=" h-full container flex">
  <div class="flex h-full w-6 items-center overflow-hidden rounded">
    <img
      src={logo.replace("[PB]", env.POCKETBASE_URL) ?? ""}
      class=" w-6 h-6 object-cover shadow"
      alt={imageCaption}
      width={logoWidths}
    />
  </div>
  <div class="px-1 ml-1 h-full text-[0.5rem]">
    <span class="inline">
      <slot />
    </span>
  </div>
</div>
