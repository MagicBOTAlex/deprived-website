<script lang="ts">
  import HexagonSkills from "../comps/HexagonSkills.svelte";
  import SlantedProjectHighlights from "../comps/SlantedProjectHighlights.svelte";
</script>

<div class="A4 include-in-print">
  <SlantedProjectHighlights />

  <div class="flex flex-col">
    {#each { length: 16 } as _, i}
      <div
        class="warning-tape w-full"
        style="height: 1px; --offset: {i * (40 - 1)}px"
      ></div>
    {/each}
  </div>

  <HexagonSkills />
</div>

<style>
  .A4 {
    width: 210mm;
    height: 296mm;
    background-color: #eeeeee;
  }

  .warning-tape {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;

    /* Variables */
    --color-first: #eeeeee;
    --color-second: #121212;

    background: linear-gradient(
      -45deg,
      var(--color-first) 25%,
      var(--color-second) 25%,
      var(--color-second) 50%,
      var(--color-first) 50%,
      var(--color-first) 75%,
      var(--color-second) 75%,
      var(--color-second)
    );

    background-size: 40px 40px;

    /* Apply the offset here */
    background-position: calc(var(--offset)) 0;
  }
</style>
