<script lang="ts">
  import re from "@ts/Redaction/Redactor";
  import * as m from "$paraglide/messages";
  import { getLocale, setLocale, locales } from "$paraglide/runtime";

  import SendHorizontal from "@lucide/svelte/icons/send-horizontal";

  // Left side
  import NameAndImage from "./comps/NameAndImage.svelte";
  import ShortProfile from "./comps/ShortProfile.svelte";
  import CombinedContacts from "./comps/CombinedContacts.svelte";
  import LinkedInQR from "./comps/LinkedInQR.svelte";

  // Right side
  import Profile from "./comps/Profile.svelte";
  import Experience from "./comps/Experience.svelte";
  import Education from "./comps/Education.svelte";
  import BiggestFlex from "./comps/BiggestFlex.svelte";
  import TableOfProjects from "./comps/TableOfProjects.svelte";

  // Decorations
  import LeftTopDecor from "./comps/LeftTopDecor.svelte";
  import BottomRightDecor from "./comps/BottomRightDecor.svelte";
  import AlexWatermark from "./comps/AlexWatermark.svelte";
  import RepeatedSkills from "./comps/RepeatedSkills.svelte";

  // Discord embed
  import preveiwImage from "$lib/alex/cv-comps/preview.png";

  // pages
  import Page2 from "./pages/page2.svelte";

  // Print detection setup
  import onMount from "@e/onMount";
  import { goto } from "$app/navigation";
  let debug = false;
  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let needsUrlUpdate = false;

    // 1. Safely handle hideOnPrint without reloading
    if (!urlParams.has("hideOnPrint")) {
      urlParams.set("hideOnPrint", "1");
      needsUrlUpdate = true;
    }

    // 2. Check for locale in URL, fallback to localStorage
    const urlLocale = urlParams.get("locale");
    const savedLocale = localStorage.getItem("cv_locale");

    const targetLocale = urlLocale || savedLocale;

    if (targetLocale && targetLocale !== getLocale()) {
      setLocale(targetLocale as any); // Update Paraglide
      if (!urlLocale) {
        urlParams.set("locale", targetLocale);
        needsUrlUpdate = true;
      }
    }

    // 3. Update the URL silently if we changed anything
    if (needsUrlUpdate) {
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }

    const params = new URLSearchParams(window.location.search);
    debug = params.has("debug");

    loadMotivation();
  });

  function changeLanguage(tag: string) {
    setLocale(tag as any);
    localStorage.setItem("cv_locale", tag);
    const url = new URL(window.location.href);
    url.searchParams.set("locale", tag);
    window.location.href = url.toString();
  }

  let motivationInput: HTMLTextAreaElement;
  let motivation: string | null = "";
  function loadMotivation() {
    const content = localStorage.getItem("motivation");
    if (content && motivationInput) {
      motivationInput.value = content;
      motivation = content;
    }
  }

  function submitMotivation() {
    if (!motivationInput) return;
    const content = motivationInput.value;
    if (!content.trim()) {
      localStorage.removeItem("motivation");
    } else {
      localStorage.setItem("motivation", content);
    }
    window.location.reload();
  }

  function getFormattedDate(): string {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
</script>

<div>
  <title
    >{motivation ? "CUSTOM" : ""}
    {$re?.name ?? "Alex"}'s {getLocale().toUpperCase()} CV {getFormattedDate()}</title
  >
  <meta content="{$re?.name ?? 'Alex'}'s CV" property="og:title" />
  <meta
    content="This CV is made completely with svelte + html + css + js"
    property="og:description"
  />
  <meta content={preveiwImage} property="og:image" />
  <meta content="#bdd6ee" data-react-helmet="true" name="theme-color" />

  <div class="cv-info-container h-[4cm] flex flex-col w-full hide-on-print">
    <div class="flex w-full h-full items-center justify-center gap-8">
      <div class=" flex flex-col">
        <div>
          <div class="keyboard-key">P</div>
          +
          <div class="keyboard-key">CTRL</div>
          + Chrome = PDF
        </div>
        <div class="flex gap-2">
          CV Languages:
          {#each locales as tag}
            <button
              class="btn btn-xs {tag == getLocale()
                ? 'btn-filled btn-primary text-primary-content'
                : 'btn-outline'}"
              onclick={() => {
                changeLanguage(tag);
                // window.location.reload();
              }}
            >
              {tag.toUpperCase()}
            </button>
          {/each}
        </div>
      </div>
      <div class="flex flex-col">
        <div>Insert motivation</div>
        <form
          onsubmit={(e) => {
            e.preventDefault();
            submitMotivation();
          }}
          class="join"
        >
          <textarea
            bind:this={motivationInput}
            class="join-item input-xs h-[3cm] w-[12cm] textarea textarea-outline resize-x"
            placeholder="Type something..."
          ></textarea>
          <button type="submit" class="btn btn-xs join-item">
            <SendHorizontal />
          </button>
        </form>
      </div>
    </div>
  </div>
  <!-- space -->
  <!-- space -->
  <!-- space -->
  <!-- space -->

  <div class="w-full flex flex-col max-h-[70cm]">
    <div
      class="relative w-full flex justify-center {$re?.name ? 'hidden' : ''}"
    >
      <RepeatedSkills
        class="overcozette-force text-5xl text-secondary/32 text-base-300 "
        style="transform: translateY(-90rem)"
        textOverride={["REDACTED_VERSION"]}
        targetTextHeight={90}
        targetTextWidth={150}
        rotation="-25deg"
        textRowPadding={"1rem"}
      />
    </div>

    <div
      class="{$re?.name
        ? ''
        : 'absolute'} h-full w-full flex md:justify-center items-center"
    >
      <div class="NotoSans flex flex-col cv-config include-in-print">
        <div class="cv-container sections decorations">
          <div id="left-section" class=" flex justify-center">
            <img
              class="absolute self-center top-0 bottom-0 text-white"
              style="transform: rotate(-90deg) scale(550%) translate(-2.5mm, 0); background-color: rgba(1, 1, 1, 0.85)"
              src="/images/Zhen/cv/ZRuler-F_Cu.svg"
              alt=""
            />
            <LeftTopDecor />
            <BottomRightDecor Style="pointer-events: none;" />
            <div
              class="absolute rotate-12 width-[10cm] h-full right-[15cm]"
              style="background-color: #bdd6ee"
            ></div>
            <div class="text-[var(--left-text-color)] pointer-events-none">
              <div
                class="pointer-events-auto flex flex-col justify-center w-full items-center"
              >
                <NameAndImage />
                <div class="py-2"></div>
                <ShortProfile />
                <div class="py-2"></div>
                <CombinedContacts />
                <div class="py-2"></div>
                <LinkedInQR />
              </div>
            </div>
            <div class="relative h-full flex flex-col justify-end items-center">
              <div class="text-sm w-32 mr-32 opacity-90 text-slate-400">
                <div class="bg-black opacity-75 rounded">
                  I designed this PCB<br />For the nRF52840
                </div>
              </div>
            </div>
          </div>
          <div id="leftSectionSeperator"></div>
          <div
            id="right-section"
            class="text-[var(--right-text-color)] bg-white"
          >
            <AlexWatermark Style="pointer-events: none;" />
            <div id="TopRightSkillsText">
              <RepeatedSkills
                class="cozette-force"
                targetTextHeight={30}
                targetTextWidth={150}
              />
            </div>
            <div>
              <Profile />
              <BiggestFlex />
              <TableOfProjects />
              <Experience />
              <Education />
            </div>
          </div>
        </div>
        <div class="flex justify-center hide-on-print py-4">
          <div>===== Next page =====</div>
        </div>
        <Page2 />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .cv-config * {
    --left-text-color: #eeeeee;
    --left-line-color: #999999;

    --left-decor-text-color: #eeeeee;
    --left-decor-line-color: #999999;

    --qr-color: #999999;

    --left-grid-line-color: #ffffff;
    --left-grid-bg-color: #000000;
    --left-grid-opacity: 0.1;
    --left-grid-size: 10px;

    --right-text-color: #333333;
  }

  .corner-border-container {
    background-color: var(--left-grid-bg-color);
    background-image:
      linear-gradient(
        var(--left-decor-line-color),
        var(--left-decor-line-color)
      ),
      linear-gradient(
        var(--left-decor-line-color),
        var(--left-decor-line-color)
      ),
      linear-gradient(
        var(--left-decor-line-color),
        var(--left-decor-line-color)
      ),
      linear-gradient(
        var(--left-decor-line-color),
        var(--left-decor-line-color)
      );
    background-size:
      30px 4px,
      /* top-left horizontal */ 4px 30px,
      /* top-left vertical */ 30px 4px,
      /* bottom-right horizontal */ 4px 30px; /* bottom-right vertical */
    background-repeat: no-repeat;
    background-position:
      top left,
      top left,
      bottom right,
      bottom right;
  }

  .bg-grid-cv {
    background:
      linear-gradient(
        -90deg,
        rgba(255, 255, 255, var(--left-grid-opacity)) 1px,
        transparent 1px
      ),
      linear-gradient(
        rgba(255, 255, 255, var(--left-grid-opacity)) 1px,
        transparent 1px
      ),
      var(--left-grid-line-color);
    background-size:
      var(--left-grid-size) var(--left-grid-size),
      var(--left-grid-size) var(--left-grid-size),
      80px 80px,
      80px 80px,
      80px 80px,
      80px 80px,
      80px 80px,
      80px 80px;
    background-color: var(--color-base-100);
  }

  .cv-info-container {
    background-color: #2b2a2a;
    display: flex;
    justify-content: center;
    align-items: center;

    .keyboard-key {
      display: inline;
      padding-left: 1mm;
      padding-right: 1mm;

      border-radius: 2mm;

      background-color: #3e3d3d;
    }
  }

  .cv-container {
    width: 210mm;
    height: 297mm;

    background-color: #eeeeee;

    overflow: visible;
    display: flex;
    padding: auto;
  }

  .sections {
    // Shared between sections
    > div {
      display: grid;
      z-index: 0;

      // Needed to cuttoff the extra decoration
      position: relative;
      overflow: hidden;
    }

    #left-section {
      // background-color: #bdd6ee;

      > div:nth-child(5) {
        z-index: 1;
        width: 17.5rem;

        left: 0;

        padding-top: 30mm;
      }
    }

    #right-section {
      width: calc(100% / 3 * 2);

      > div:last-child {
        z-index: 1;
        width: 100%;

        left: 0;

        display: grid;
        place-items: center;
        row-gap: 6mm;

        padding-top: 45mm;
        padding-bottom: 30mm;

        // Disable interactivity for padding
        // pointer-events: none;
      }
    }
  }

  .decorations {
    #leftSectionSeperator {
      position: relative;
      height: 100%;
      width: 0%;
      z-index: 1;
      overflow: visible;
      > div {
        position: absolute;
        height: 100%;
        width: 5mm;
        z-index: 1;
        background: linear-gradient(90deg, #3636364f, #00000000);
      }
    }
    > div {
      #TopRightSkillsText {
        position: absolute;
        z-index: 0;

        display: grid;
        place-items: center;
        vertical-align: top;
        width: 100%;

        place-content: center;

        padding: 0;
        height: 50mm;

        mask-image: linear-gradient(180deg, #000 0%, transparent 110%);

        color: rgb(190, 190, 190);
        font-family: "CozetteVector";
        font-size: x-large;
      }
    }
  }
</style>
