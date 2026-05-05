<script lang="ts">
  import re from "@ts/Redaction/Redactor";

  import NamePlate from "./NamePlate.svelte";
  import selfie from "$lib/alex/cv-comps/VRNerd.jpg";
  import env from "@src/ts/EnvHandler";
</script>

<div class="nameAndImageContainer">
  <NamePlate />
  <div
    class="mt-4 w-48 h-48 overflow-hidden shadow-xl rounded-lg flex justify-center items-center"
  >
    <img
      src={$re?.selfie.replace("[PB]", env.POCKETBASE_URL) ?? selfie}
      class="selfie-constraints object-cover"
      alt="Selfie"
    />
  </div>
</div>

<style>
  .nameAndImageContainer {
    display: grid;
    place-items: center;
  }

  .selfie-constraints {
    max-width: 100%;
  }
</style>
