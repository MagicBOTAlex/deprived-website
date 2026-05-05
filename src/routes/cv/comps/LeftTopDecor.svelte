<script>
  import { getLocale, setLocale, locales } from "$paraglide/runtime";
  import re from "@ts/Redaction/Redactor";

  import RepeatedSkills from "./RepeatedSkills.svelte";

  // Cedit
  import LinkToSource from "./LinkToSource.svelte";

  export let Style = "";
  export let Class = "";
</script>

<div class="flex justify-end w-full">
  <div class="container {Class}" style={Style}>
    <div class="NotoSans-cn text-center bg-[var(--left-grid-bg-color)]">
      <RepeatedSkills
        rotation="0deg"
        textOverride={["Hello", "你好", "Hej"]}
        targetTextHeight={3}
        targetTextWidth={50}
        applyRotation={false}
      />
    </div>
    <!-- <div /> -->
    <!-- <div class="flex bg-black justify-center"> -->
    <!--   <div class="w-[6cm]"> -->
    <!--     <LinkToSource /> -->
    <!--   </div> -->
    <!-- </div> -->
  </div>
  <div class="z-10 pr-4 pt-2 {!$re?.name ? 'hidden' : ''}">
    <a
      href="/cv?locale={getLocale() == 'en' ? 'dk' : 'en'}&key={$re?.key ??
        'nah'}"
      on:click|preventDefault={(e) =>
        (window.location.href = e.currentTarget.href)}
      ><span class="text-blue-500 underline"
        >{getLocale() == "en" ? "Se Dansk" : "View English"} CV</span
      ></a
    >
  </div>
</div>

<style lang="scss">
  .container {
    position: absolute;
    transform: translate(-30mm, 7.5mm) rotate(-45deg);
    display: grid;
    justify-self: start;
    vertical-align: top;
    align-self: flex-start;

    z-index: 0;

    > div:nth-child(1) {
      //background-color: #2f559622;
      width: 100mm;
      height: 17.5mm;
      padding-bottom: 1mm;
      padding-top: 1mm;

      // Text inside
      display: grid;
      place-content: center;
      border-bottom: var(--left-decor-line-color) dotted 1mm;
      border-top: var(--left-decor-line-color) dotted 1mm;

      &:first-child {
        color: var(--left-decor-text-color);
        font-size: 3mm;
        //font-weight: bold;
      }
    }

    > div:nth-child(2) {
      padding-top: 4mm;
      //border-bottom: #4472c4 dashed 2mm;

      // background-color: var(--left-grid-bg-color);

      background-image: linear-gradient(
        to right,
        var(--left-decor-line-color) 70%,
        rgba(255, 255, 255, 0) 0%
      );
      background-position: bottom;
      background-size: 6mm 1.5mm;
      background-repeat: repeat-x;
    }
  }
</style>
