<script lang="ts">
  import CustomScrollBar from "@src/routes/comps/CustomScrollBar.svelte";
  import { Info } from "lucide-svelte";
  import { marked } from "marked";
  import { onMount } from "svelte";

  let desc: HTMLDivElement;

  const testMarkdown = `
# I'm a Markdown header

## I'm a smaller Markdown header

This is a paragraph of **Lorem Ipsum** text. I can use _italics_, \`inline code\`, and even a [link to Google](https://www.google.com).

Here's a list:
* Item one
* Item two
* Item three

And here's a blockquote:
> This is a quote, a famous one at that, from some wise person.
  `;
  onMount(async () => {
    desc.innerHTML = await marked.parse(testMarkdown);
  });
</script>

<div class="grid grid-cols-6 w-full h-[80vh]">
  <div class="h-full col-start-2 col-span-2">
    <div class="flex flex-col items-center justify-center w-full h-full">
      <div class="flex flex-col w-72 gap-4">
        <div class="flext justify-center items-center w-full h-72 bg-lime-200">
          <img
            class="object-cover w-full h-full"
            src="https://picsum.photos/seed/picsum/200/300"
            alt=""
          />
        </div>
        <CustomScrollBar overflowX="scroll" overflowY="hidden" Class="">
          <div class="relative flex w-full gap-4 pb-4">
            {#each { length: 6 } as i}
              <img
                src="https://placehold.co/600x400"
                class="w-16 h-16 object-cover"
                alt=""
              />
            {/each}
          </div>
        </CustomScrollBar>
      </div>
    </div>
  </div>
  <div class="h-full col-start-4 col-span-2">
    <div class="flex flex-col items-center justify-center w-full h-full">
      <div class="w-full grid items-center">
        <div
          class="flex border-l-2 pl-1 border-primary-content text-primary-content flex-col w-full"
        >
          <span class="text-left text-2xl">Art thing - Zylle</span>
          <span class="text-left">100DKK</span>
        </div>
        <div class="py-1"></div>
        <div class="flex">
          <div class="flex flex-col text-primary-content opacity-30">
            <span>10EUR</span>
            <span>10USD</span>
            <span>10GBP</span>
          </div>
          <div
            class="tooltip"
            data-tip="These conversions is a rough estimate, based on data I found on Google"
          >
            <Info class="opacity-30 p-1" />
          </div>
        </div>
        <div class="py-16"></div>
        <div class="flex w-full gap-2">
          <input type="number" class="input w-32" />
          <button class="btn grow btn-primary">Buy</button>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="grid grid-cols-6 w-full h-[80vh]">
  <div class="col-start-2 col-span-4">
    <div class="tabs tabs-box">
      <input type="radio" name="my_tabs_1" class="tab" aria-label="Tab 1" />
      <input
        type="radio"
        name="my_tabs_1"
        class="tab"
        aria-label="Tab 2"
        checked="checked"
      />
      <input type="radio" name="my_tabs_1" class="tab" aria-label="Tab 3" />
    </div>
    <div bind:this={desc}></div>
  </div>
</div>
