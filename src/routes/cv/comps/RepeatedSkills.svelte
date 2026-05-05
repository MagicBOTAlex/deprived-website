<script lang="ts">
  // Width of num chars and height nom of chars
  export let targetTextWidth: number;
  export let targetTextHeight: number;
  export let textRowPadding: string = "";

  export let rotation: string = "-45deg";

  export let textOverride: string[] | undefined = undefined;

  // Assign default value if textOverride is undefined
  let repeatingText: string[] = textOverride ?? [
    "C",
    "C++",
    "C#",
    "ARDUINO",
    "PYTHON",
    "JAVA",
    "JAVASCRIPT",
    "TYPESCRIPT",
    "HTML",
    "CSS",
  ];

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  function GrabRandomString() {
    let outString: string = "";
    while (outString.length < targetTextWidth) {
      outString += repeatingText[getRandomInt(repeatingText.length)] + " ";
    }

    return outString; // At about target size
  }
</script>

<div {...$$restProps}>
  {#each { length: targetTextHeight } as _, i}
    <span
      class=" SkillsText"
      style="transform: rotate({rotation}); padding: {textRowPadding};"
    >
      {GrabRandomString()}
    </span>
  {/each}
</div>

<style>
  .SkillsText {
    text-align: start;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;

    width: 2rem;
  }

  .rotate45 {
    transform: rotate(-45deg);
  }
</style>
