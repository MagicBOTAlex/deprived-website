<script lang="ts">
  import DoubleRangeSlider from "@src/lib/components/DoubleRangeSlider.svelte";

  class Range {
    start: number = 0;
    end: number = 1;
  }

  let leftRange: Range = new Range();
  let rightRange: Range = new Range();

  function round(num: number): number {
    return Math.round(num * 10) / 10;
  }

  function isValidSelection() {
    if (leftRange.start == leftRange.end) return false;
    if (rightRange.start == rightRange.end) return false;
    return true;
  }
</script>

<div class="flex flex-col items-center justify-center w-full prose">
  <div class="w-98">
    <div class="flex w-full justify-between">
      <div class="-ml-1.5">-1</div>
      <div>0</div>
      <div>1</div>
    </div>
    <div class="flex gap-8">
      <DoubleRangeSlider
        bind:start={leftRange.start}
        bind:end={leftRange.end}
      />
      <DoubleRangeSlider
        bind:start={rightRange.start}
        bind:end={rightRange.end}
      />
    </div>
    <div class="flex w-full justify-around">
      <div>
        -{round(1 - leftRange.start).toFixed(1)} --- -{round(
          1 - leftRange.end,
        ).toFixed(1)}
      </div>
      <div>
        {round(rightRange.start).toFixed(1)} --- {round(rightRange.end).toFixed(
          1,
        )}
      </div>
    </div>
  </div>
  <div class="w-full flex justify-center max-h-screen">
    <img
      class="max-h-[80vh] object-contain"
      src={"https://deprived.dev/assets/school/social-science/data/plots/sentiment_graph_-" +
        round(1 - leftRange.end).toFixed(1) +
        "_-" +
        round(1 - leftRange.start).toFixed(1) +
        "_" +
        round(rightRange.start).toFixed(1) +
        "_" +
        round(rightRange.end).toFixed(1) +
        ".jpg"}
      alt=""
    />
  </div>
</div>
