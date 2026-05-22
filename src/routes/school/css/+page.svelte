<script lang="ts">
  import DoubleRangeSlider from "@src/lib/components/DoubleRangeSlider.svelte";
  import iso3 from "./iso3.json";
  import countryList from "country-list-js";
  import onMount from "@src/optimizers/onMount";
  import Search from "lucide-svelte/icons/search";
  import X from "lucide-svelte/icons/x";
  import CustomScrollBar from "../../comps/CustomScrollBar.svelte";

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
    // selectCountry("DNK", true);
    console.log(countryList.findByIso3("DNK"));
  });
</script>

<div class="flex flex-col w-full h-full pt-40 gap-16 NotoSans">
  <div class="flex flex-col items-center justify-center w-full">
    <h1 class="text-4xl">Country Mention Networks in UN Speeches</h1>
    <div>Computational Social Science 02467 - Group 10</div>
  </div>

  <div class="max-w-6xl mx-auto p-6 text-base-content font-sans">
    <!-- Section 1: Overview -->
    <div class="flex">
      <section class="mb-8 flex-2/3">
        <p class="text-base leading-relaxed mb-4">
          The analysis is based on the United Nations General Debate Corpus
          (UNGDC), which contains speeches delivered by countries at the United
          Nations over multiple decades. Each observation consists of a speech,
          a country, and a year, making it possible to connect political
          language with both countries and time.
        </p>
        <p
          class="text-sm font-semibold tracking-wide text-base-content/70 mb-2 uppercase"
        >
          This makes the dataset especially useful for studying:
        </p>
        <ul class="list-disc pl-6 space-y-1 text-base text-base-content/80">
          <li>international attention patterns</li>
          <li>political communication</li>
          <li>diplomatic relationships</li>
          <li>sentiment in international discourse</li>
        </ul>
      </section>
      <div class="flex-1/3">
        <div class="border-2 border-base-300 p-2 rounded-xl">
          <p
            class="card text-sm font-semibold tracking-wide text-base-content/70 mb-2 uppercase"
          >
            Dataset: UN General Debate Corpus (UNGDC)
          </p>
          <ul class="list-disc pl-6 space-y-1 text-base text-base-content/80">
            <li><span class=" font-bold">Years covered:</span> 1970-2015</li>
            <li>
              <span class=" font-bold">Speeches:</span> 7507
            </li>
            <li>
              <span class=" font-bold">Countries:</span> 199 unique countries
            </li>
            <li>
              <span class="font-bold">Main variables:</span> <br />
              <span class="badge">year</span>
              <span class="badge">countries</span>
              <span class="badge">speech text</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Section 2: How the Network Works -->
    <section class="mb-8">
      <h2
        class="text-2xl font-bold border-b border-base-200 pb-2 mb-4 text-base-content"
      >
        How the Network Works
      </h2>
      <p class="text-base leading-relaxed mb-4">
        In this project, countries are treated as nodes, while mentions from one
        country to another form directed edges. A directed edge means that one
        country refers to another in a speech. The direction matters, because
        diplomatic attention is not necessarily symmetric: a country may talk
        about another country much more than it is talked about in return.
      </p>
      <p class="text-base leading-relaxed mb-4">
        Edge color reflects whether the mention is framed in a more positive or
        negative way. This allows the network to capture both the volume and the
        tone of diplomatic attention.
      </p>

      <div
        class="mockup-code bg-base-200 text-base-content pre-wrap rounded-xl px-4 py-4 before:content-none"
      >
        <ul class="space-y-2 text-base">
          <li><span class=" font-bold">Node:</span> a country</li>
          <li>
            <span class=" font-bold">Directed edge:</span> one country mentions another
          </li>
          <li>
            <span class=" font-bold">Edge weight:</span> how often the mention occurs
          </li>
          <li>
            <span class="font-bold">Edge color:</span> whether the mention is more
            positive or more negative
          </li>
        </ul>
      </div>
    </section>
  </div>

  <div
    class="collapse collapse-arrow bg-base-200 border border-base-300 rounded-box w-full"
  >
    <!-- The checkbox input manages the open/close state automatically -->
    <input type="checkbox" checked={true} />

    <!-- Accordion Header Title -->
    <div class="collapse-title text-4xl text-center font-medium">
      Full Network Overview
    </div>

    <!-- Accordion Body Content -->
    <div class="collapse-content">
      <div class="w-full flex justify-center">
        <!-- Section 3: Full Network Overview -->
        <section class="max-w-6xl">
          <p class="text-base leading-relaxed">
            The graph below shows the full diplomatic mention network built from
            the UN speeches. Each node represents a country, and each directed
            edge represents one country mentioning another. Edge color reflects
            whether the mention is framed in a more positive or more negative
            way. Users can adjust the positive and negative sliders to filter
            the graph by sentiment strength. Because the full graph contains a
            very large number of connections, it provides a useful overview of
            how dense and interconnected international political discourse is,
            but it is too crowded for detailed country level interpretation.
          </p>
        </section>
      </div>

      <div class="flex flex-col items-center justify-center w-full prose pt-4">
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
    </div>
  </div>

  <div
    class="collapse collapse-arrow bg-base-200 border border-base-300 rounded-box w-full"
  >
    <!-- The checkbox input manages the open/close state automatically -->
    <input type="checkbox" checked={true} />

    <!-- Accordion Header Title -->
    <div class="collapse-title text-4xl text-center font-medium">
      Explore Country Level Relationships
    </div>

    <!-- Accordion Body Content -->
    <div class="collapse-content">
      <div class="w-full flex flex-col items-center gap-10">
        <div class="max-w-6xl">
          <div>
            To make the network easier to explore in more detail, the website
            also includes filtered interactive graphs. Here, users can select a
            country and examine both how that country talks about others and how
            others talk about that country. Users can also zoom in, zoom out,
            and move nodes around to inspect the network more closely. This
            makes it easier to compare outgoing and incoming diplomatic
            attention, while also showing whether these references are framed
            more positively or negatively.
          </div>
        </div>

        <div
          class="{currentCountry == '' ? 'hidden' : ''} relative"
          style="width: 80%; height: 800px;"
        >
          <div>{currentCountrySelected}</div>
          <div class="relative w-full h-full">
            <iframe
              src={currentCountry}
              width="100%"
              height="100%"
              style="border: none; background: transparent;"
              allowtransparency={true}
              title="Network Graph"
              bind:this={interactiveEmbed}
              class="relative"
            >
            </iframe>
            <button
              on:click={() => {
                currentCountrySelected = "";
                currentCountry = "";
              }}
              class="absolute right-0 top-0"
            >
              <X class="text-accent w-16 h-18 cursor-pointer" />
            </button>
          </div>
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
          <div class="italic opacity-60">
            The interactive graphs has to be filtered, due to the large amount
            of connections, making a full interactive graph, requires too much
            processing power.
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
          <div class="py-2"></div>
          <CustomScrollBar
            overflowX="hidden"
            overflowY="auto"
            Class="h-[60vh] border border-base-200  "
            requireAbsolute={true}
            hideOnMobile={true}
          >
            <table class="table w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th class="sticky top-0 bg-base-100 z-10">Country</th>
                  <th class="sticky top-0 bg-base-100 z-10">ISO3</th>
                  <th class="sticky top-0 bg-base-100 z-10">From buttons</th>
                  <th class="sticky top-0 bg-base-100 z-10">Towards buttons</th>
                </tr>
              </thead>
              <tbody>
                {#each iso3 as country}
                  {#if (getCountryName(country)
                    .toLowerCase()
                    .includes(searchFilter.toLowerCase()) || country
                      .toLowerCase()
                      .includes(searchFilter.toLowerCase())) && (!regionFilters.some((r) => r.selected) || regionFilters.find((r) => r.region === countryList.findByIso3(country)?.continent)?.selected)}
                    <!-- Changed your data cell wrappers from <th> to <td> for correct semantics -->
                    <tr class="hover">
                      <td>{getCountryName(country)}</td>
                      <td>{country}</td>
                      <td>
                        <div
                          class="w-full h-full grid items-center justify-center"
                        >
                          <button
                            on:click={() => selectCountry(country, false)}
                            class="btn btn-outline btn-primary">From</button
                          >
                        </div>
                      </td>
                      <td>
                        <div
                          class="w-full h-full grid items-center justify-center"
                        >
                          <button
                            on:click={() => selectCountry(country, true)}
                            class="btn btn-outline btn-secondary"
                            >Towards</button
                          >
                        </div>
                      </td>
                    </tr>
                  {/if}
                {/each}
              </tbody>
            </table>
          </CustomScrollBar>
        </div>
      </div>
    </div>
  </div>

  <div
    class="collapse collapse-arrow bg-base-200 border border-base-300 rounded-box w-full"
  >
    <!-- The checkbox input manages the open/close state automatically -->
    <input type="checkbox" checked={true} />

    <!-- Accordion Header Title -->
    <div class="collapse-title text-4xl text-center font-medium">
      Main findings
    </div>

    <!-- Accordion Body Content -->
    <div class="collapse-content">
      <div class="justify-center flex">
        <div class="flex gap-4 max-w-7xl">
          <section class="flex-2/3 flex flex-col gap-2">
            <div>
              Our analysis suggests that diplomatic attention in UN speeches is
              unevenly distributed across countries. A smaller number of
              countries appear much more frequently in international discourse,
              while many others are mentioned less often. In the network,
              countries such as the United States, China, and Russia stand out
              as especially visible actors, which suggests that global political
              attention is concentrated around a limited set of highly prominent
              states.
            </div>
            <div>
              The country level graphs also show that diplomatic attention is
              directional rather than balanced. Some countries appear to direct
              attention broadly toward many others, while some are more
              prominent as targets of discussion. For example, the United States
              appears as a country with broad outgoing attention, while China
              and Russia also emerge as major targets of incoming attention from
              other countries. This shows that centrality in the network can
              reflect different roles: a country may be highly active in talking
              about others, highly visible as a topic of discussion, or both.
            </div>
            <div>
              Another important pattern is that international political
              discourse is not purely positive or purely negative. The sentiment
              based graphs suggest that the same country can receive both
              supportive and critical references depending on who is speaking
              and in what context. This is especially visible for countries like
              the United States, China, and Russia, which appear in a mix of
              positive and negative relationships rather than fitting into a
              single simple category. This highlights the complexity of
              diplomatic language, where cooperation, criticism, and strategic
              concern can exist at the same time.
            </div>
            <div class="py-2"></div>
            <div>
              The filtered graphs also make it easier to compare large, globally
              central actors with smaller or more selective ones. For example,
              the Vatican appears much less densely connected than countries
              such as the United States, China, or Russia. This suggests a more
              selective pattern of diplomatic attention, where some actors are
              present in the network but do not occupy the same broad, central
              role as major geopolitical powers.
            </div>
            <div>
              Taken together, these findings suggest that UN speeches reveal
              more than isolated political statements. They reflect a larger
              structure of global diplomatic attention in which a small number
              of countries occupy especially central positions, while others
              appear in more limited or specialized ways. By combining mention
              frequency with positive and negative framing, the network provides
              a more nuanced picture of how countries are represented in
              international discourse.
            </div>
          </section>

          <div class="lg:w-1/3 flex flex-col gap-4 max-h-screen min-h-0">
            <div class="font-semibold text-2xl shrink-0">
              Example of China’s outgoing vs incoming diplomatic attention
            </div>
            <div
              class="badge bagde-xl badge-primary font-semibold text-primary-content"
            >
              Interactive
            </div>

            <div class="flex flex-1 flex-col gap-4 min-h-0 overflow-hidden">
              <iframe
                src="https://deprived.dev/assets/school/social-science/data/interactive/CHN-in.html"
                style="border: none; background: transparent;"
                allowtransparency={true}
                title="Network Graph Incoming"
                class="w-full h-[400px] block overflow-hidden"
              >
              </iframe>

              <iframe
                src="https://deprived.dev/assets/school/social-science/data/interactive/CHN-out.html"
                style="border: none; background: transparent;"
                allowtransparency={true}
                title="Network Graph Outgoing"
                class="w-full h-[400px] block overflow-hidden"
              >
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-center w-full">
    <div class="flex flex-col gap-4">
      <div class="text-4xl text-center">Resources</div>
      <div class="flex justify-center gap-8">
        <a
          class="link link-primary"
          href="https://git.deprived.dev/DeprivedDevs/deprived-main-website/src/branch/main/src/routes/school/css"
          >Website repository</a
        >
        <a
          class="link link-primary"
          href="https://github.com/MagicBOTAlex/Social-Informatik-02467-project"
          >Python repository</a
        >
        <a
          class="link link-primary"
          href="https://www.kaggle.com/datasets/unitednations/un-general-debates"
          >Dataset from kaggle</a
        >
      </div>
    </div>
  </div>

  <div class="py-8"></div>
</div>
