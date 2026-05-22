<script lang="ts">
  import DoubleRangeSlider from "@src/lib/components/DoubleRangeSlider.svelte";
  import iso3 from "./iso3.json";
  import countryList from "country-list-js";
  import onMount from "@src/optimizers/onMount";
  import Search from "lucide-svelte/icons/search";

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

  let currentCountry: string = "";
  let currentCountrySelected: string = "";
  let interactiveEmbed: HTMLIFrameElement;
  let searchFilter: string = "";

  interface RegionFilter {
    region: string;
    selected: boolean;
  }
  const continents: string[] = countryList.continents();
  const regionFilters: RegionFilter[] = continents.map((name) => ({
    region: name,
    selected: false,
  }));

  function selectCountry(country: string, towards: boolean) {
    currentCountry =
      "https://deprived.dev/assets/school/social-science/data/interactive/" +
      country +
      "-" +
      (towards ? "in" : "out") +
      ".html";

    currentCountrySelected = towards
      ? "Others towards " + getCountryName(country)
      : getCountryName(country) + "'s opinion of others";

    setTimeout(() => {
      interactiveEmbed.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 200);
  }

  function getCountryName(code) {
    const uppercaseCode = code.toUpperCase();

    // Hardcoded historical and regional exceptions
    const exceptions = {
      YDYE: "People's Democratic Republic of Yemen",
      CMR: "Cameroon",
      CSK: "Czechoslovakia",
      YUG: "Yugoslavia",
      DDR: "German Democratic Republic",
      EU: "European Union",
    };

    if (exceptions[uppercaseCode]) {
      return exceptions[uppercaseCode];
    }

    const countryData = countryList.findByIso3(uppercaseCode);
    return countryData ? countryData.name : "Country not found";
  }

  onMount(() => {
    console.log(countryList.findByIso3("DNK"));
  });
</script>

<div class="flex flex-col w-full h-full pt-40 gap-16 NotoSans">
  <div class="flex justify-center w-full">
    <h1 class="text-4xl">Computational Social Science</h1>
  </div>
  <div class="flex flex-col items-center justify-center w-full prose">
    <div class="flex gap-30 justify-between">
      <div>Negative range</div>
      <div>Positive range</div>
    </div>
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
          {round(rightRange.start).toFixed(1)} --- {round(
            rightRange.end,
          ).toFixed(1)}
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
  <div class="w-full flex flex-col items-center gap-10">
    <div class="w-80">
      <div class="text-4xl">Interactive graphs</div>
      <div>
        The interactive graphs has to be filtered, due to the large amount of
        connections, making a full interactive graph, requires too much
        processing power.
      </div>
    </div>

    <div
      class={currentCountry == "" ? "hidden" : ""}
      style="width: 80%; height: 800px;"
    >
      <div>{currentCountrySelected}</div>
      <iframe
        src={currentCountry}
        width="100%"
        height="100%"
        style="border: none; background: transparent;"
        allowtransparency={true}
        title="Network Graph"
        bind:this={interactiveEmbed}
      >
      </iframe>
    </div>
    <div class="w-[60%]">
      <div class="flex justify-between">
        <div class="text-2xl">List of interactive graphs</div>
        <div class="join">
          <button
            class="btn btn-outline btn-disabled btn-accent join-item grid items-center justify-center"
          >
            <Search />
          </button>
          <input
            bind:value={searchFilter}
            type="text"
            class="input join-item"
          />
        </div>
      </div>
      <div class="py-4"></div>
      <div class="flex flex-wrap gap-2">
        <div class="">Filter by region:</div>
        {#each regionFilters as filter}
          <div class="join">
            <input
              type="checkbox"
              bind:checked={filter.selected}
              class="join-item checkbox"
            />
            <div class="input input-xs join-item">{filter.region}</div>
          </div>
        {/each}
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Country</th>
            <th>ISO3</th>
            <th>From buttons</th>
            <th>Towards buttons</th>
          </tr>
        </thead>
        <tbody>
          {#each iso3 as country}
            {#if (getCountryName(country)
              .toLowerCase()
              .includes(searchFilter.toLowerCase()) || country
                .toLowerCase()
                .includes(searchFilter.toLowerCase())) && (!regionFilters.some((r) => r.selected) || regionFilters.find((r) => r.region === countryList.findByIso3(country)?.continent)?.selected)}
              <tr>
                <th>{getCountryName(country)}</th>
                <th>{country}</th>
                <th>
                  <div class="w-full h-full grid items-center justify-center">
                    <button
                      on:click={() => selectCountry(country, false)}
                      class="btn btn-outline btn-primary">From</button
                    >
                  </div>
                </th>
                <th>
                  <div class="w-full h-full grid items-center justify-center">
                    <button
                      on:click={() => selectCountry(country, true)}
                      class="btn btn-outline btn-secondary">Towards</button
                    >
                  </div>
                </th>
              </tr>
            {/if}
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
