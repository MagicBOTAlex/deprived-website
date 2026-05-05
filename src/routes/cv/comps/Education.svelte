<script>
  import SasLogo from "$lib/alex/cv-comps/SASLogo.png";

  import IconAndText2 from "./IconAndText2.svelte";
  import re from "@src/ts/Redaction/Redactor";
  import env, { initEnv } from "@src/ts/EnvHandler";
  import onMount from "@src/optimizers/onMount";

  onMount(() => {
    initEnv();
  });
</script>

<div class="container h-10">
  <div>
    <b style="text-align:left;"> Education </b>
  </div>
  <div class="flex justify-center p-2 w-full">
    <IconAndText2
      logo={$re?.education[0].imageId.replace("[PB]", env.POCKETBASE_URL) ?? ""}
    >
      <b>{$re?.education[0].name ?? "University 🤮"}</b><br />
      <p style="font-size: 0.5rem;">AI and data</p>
    </IconAndText2>
    <IconAndText2 logo={$re?.education[1].imageId ?? ""}>
      <b>{$re?.education[1].name ?? "High School 🤮"}</b><br />
      <p style="font-size: 0.5rem;">Computer science</p>
    </IconAndText2>
    <IconAndText2 logo={SasLogo}>
      <b>Master class</b><br />
      <p style="font-size: 0.5rem;">SAS Programming</p>
    </IconAndText2>
    <IconAndText2 logo={$re?.education[2].imageId ?? ""}>
      <span class="font-semibold"
        >{$re?.education[2].name ?? "Paid vecation/certificate"}</span
      ><br />
      <p style="font-size: 0.5rem;">VR development</p>
    </IconAndText2>
  </div>
</div>

<style lang="scss">
  .container {
    display: grid;
    place-items: center;
    width: 90%;

    > div:first-child {
      border-bottom: black 1mm solid;
      width: 100%;
    }
  }
</style>
