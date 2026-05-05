<script lang="ts">
  import QrCode from "svelte-qrcode";
  import DeprivedLogo from "$lib/images/DeprivedLogo.svelte";

  const cols = 9;
  const rows = 7;

  // Geometry Constants
  const width = 73; // px
  const height = width * 1.1547; // Perfect hexagonal ratio
  const gap = 4; // Space between hexagons

  // Calculations for layout
  const horizontalSpacing = width + gap;
  const verticalOverlap = height * 0.25;
  const rowHeight = height - verticalOverlap + gap;
  const offset = horizontalSpacing / 2;

  const hexPath =
    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

  import { getSkills, Skill } from "@src/ts/misc/ZhenSkills";
  import * as m from "$paraglide/messages";
  import { getLocale, setLocale, locales } from "$paraglide/runtime";
  import re from "@ts/Redaction/Redactor";
  import { redirect } from "@sveltejs/kit";

  let cvLink: string = "";
  $: cvLink = `/cv?locale=${getLocale() == "en" ? "dk" : "en"}&key=${$re?.key ?? "nah"}`;

  let skills: Skill[] = [];
  $: skills = getSkills(cvLink);

  function getIndex(r: int, c: int): int {
    return Math.floor(r / 2) * (2 * cols + 1) + (r % 2) * (cols + 1) + c;
  }
</script>

<div class=" text-[#121212] flex flex-col pb-auto">
  <div class="flex justify-between items-center px-8 py-4">
    <div class="font-semibold text-2xl">
      {m["zhen.cv.page2.mini-projects.title"]()}
    </div>
    <div class="flex gap-4">
      <div class="border-b-6 border-[#121212]/32">
        {m["zhen.cv.page2.mini-projects.ask"]()}
      </div>
      <div class="border-b-6 border-[#7bd45d]">
        {m["zhen.cv.page2.mini-projects.linked"]()}
      </div>
    </div>
  </div>
  <div class="relative overflow-show">
    <div
      class="relative pb-12"
      style="padding-left: 13.5px; width: {cols * horizontalSpacing + offset}px"
    >
      {#each Array(rows) as _, r}
        <div
          class="flex"
          style="
          margin-bottom: -{verticalOverlap - gap}px; 
          padding-left: {r % 2 !== 0 ? offset : 0}px;
        "
        >
          {#each Array(cols + (r % 2 == 0)) as _, c}
            {@const x = getIndex(r, c)}
            {#if x < skills.length}
              <div class="hidden"></div>

              <div
                class=" {skills[x].link != undefined
                  ? 'bg-[#7bd45d]'
                  : 'bg-[#121212]/32'} flex items-center justify-center shrink-0"
                style="
              width: {width}px; 
              height: {height}px; 
              clip-path: {hexPath};
              margin-right: {gap}px;
            "
              >
                {#if skills[x].link != undefined}
                  <a
                    href={skills[x].link}
                    target="_blank"
                    class="relative bg-[#eeeeee] w-full grid items-center shrink-0"
                    style="
              width: {width * 0.9}px; 
              height: {height * 0.9}px; 
              clip-path: {hexPath};
            "
                  >
                    <img class="p-3.5" src={skills[x].image} alt="" />
                    <div
                      class="w-0 h-0 absolute text-[0.2cm] top-0 pt-5 text-nowrap {skills[
                        x
                      ].link != undefined
                        ? 'text-[#589942]'
                        : 'text-[#121212]/50'}"
                      style="transform: translate(0, 0%) rotate(-30deg); margin-left: -0.2cm;"
                    >
                      {skills[x].alt}
                    </div>
                  </a>
                {:else}
                  <div
                    class="relative bg-[#eeeeee] w-full grid items-center shrink-0"
                    style="
              width: {width * 0.9}px; 
              height: {height * 0.9}px; 
              clip-path: {hexPath};
            "
                  >
                    <img class="p-3.5" src={skills[x].image} alt="" />
                    <div
                      class="w-0 h-0 absolute text-[0.2cm] top-0 pt-5 text-nowrap {skills[
                        x
                      ].link != undefined
                        ? 'text-[#589942]'
                        : 'text-[#121212]/50'}"
                      style="transform: translate(0, 0%) rotate(-30deg); margin-left: -0.2cm;"
                    >
                      {skills[x].alt}
                    </div>
                    <!-- <div class="absolute top-0 right-0"> -->
                    <!--   <div -->
                    <!--     style="transform: translate(0, 0%) rotate(30deg); " -->
                    <!--     class="w-0 text-[0.2cm] w-full pt-1" -->
                    <!--   > -->
                    <!--     {skills[x].alt} -->
                    <!--   </div> -->
                    <!-- </div> -->
                  </div>
                {/if}
              </div>
            {/if}
          {/each}
        </div>
      {/each}
    </div>

    <div class="absolute pointer-events-none left-0 bottom-0">
      <DeprivedLogo
        Class="fill-[#121212]/6 px-4"
        Style="width: 12.5cm; height: auto;"
      />
    </div>

    <div class="absolute right-0 bottom-0 px-4">
      <div class="w-full flex justify-end">
        <div class="flex flex-col justify-center items-center">
          <div>{m["zhen.cv.page2.qrcode-text"]()}</div>
          <div class="w-[50px] h-[50px] overflow-hidden">
            <QrCode
              size={205}
              padding={0}
              value={"https://deprived.dev" + cvLink}
              background={"#eeeeee"}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
