<script lang="ts">
  import MediaQuery from "svelte-media-queries";
  import onMount from "@e/onMount";

  import PreviewDeprivedLogo from "$lib/images/DeprivedLogo-NoBackground.png";

  import BackgroundVideo from "$lib/videos/DeprivedDevMontage.gif";
  import Profile from "./comps/Profile.svelte";
  import DeprivedTrackerSection from "./comps/DeprivedTrackerSection.svelte";
  import re from "@src/ts/Redaction/Redactor";

  const mobileThreshold: string = "600px"; // was 1000px.
  let mobile: boolean;
  let debug = false;

  onMount(() => {
    let tabTittleElement = window.document.getElementById("TabTittle");
    if (tabTittleElement)
      // Not null
      tabTittleElement.innerHTML = "Deprived devs";

    const params = new URLSearchParams(window.location.search);
    debug = params.has("debug");
  });
</script>

<!-- Detect mobile -->
<MediaQuery query="(max-width: {mobileThreshold})" bind:matches={mobile} />

<div class="h-full w-full">
  <title id="TabTittle">We are the DEPRIVED DEVS</title>
  <meta content="We are the deprived devs" property="og:title" />
  <meta
    content="We make everything frontend, backend, games, websites, machine learning, whatever. We're just abunch of nerds, and we love it!"
    property="og:description"
  />
  <meta content={PreviewDeprivedLogo} property="og:image" />
  <meta content="#bdd6ee" data-react-helmet="true" name="theme-color" />

  <div
    class="relative pointer-events-auto flex overflow-hidden w-full h-[70vh]"
  >
    <div class=" flex w-full h-full">
      <img
        class="w-full h-full object-cover filter blur-sm brightness-60"
        src={BackgroundVideo}
        alt="Background video"
      />
    </div>
    <div
      class="absolute left-0 top-0 w-full h-full flex justify-center items-center"
    >
      <h1
        style="font-size: {!mobile
          ? 5
          : 3}rem; text-shadow: 0.2rem 0.2rem 1rem rgba(0, 0, 0, 0.9);"
      >
        {#if !mobile}
          Deprived Devs
        {:else}
          Deprived
          <br />
          <span class="-mt-6 prose" style="font-size: 2rem;"> Devs </span>
        {/if}
      </h1>
      {#if mobile}
        <div style="width: 100px; height: 100px;"></div>
      {/if}
    </div>
  </div>

  <DeprivedTrackerSection />

  <div
    class="cozette flex flex-col justify-center items-center h-full w-full md:px-8 pt-4"
  >
    <h2 class="text-center" style="font-size: {!mobile ? 3 : 2}rem;">
      Developers
    </h2>
    <div class="">
      <div
        class="grid max-lg:grid-cols-1 sm:grid-cols-2 gap-4 p-4 max-lg:px-0 w-full"
      >
        <Profile
          name={$re?.nick ? $re?.nick + "/Alex" : "Alex"}
          tags={["Programmer", "3D artist", "UX Designer"]}
          isMobile={mobile}
        >
          <span>
            <p>
              Hi, I am {$re?.nick ? $re?.nick + "/Alex" : "Alex"}, {@html !mobile
                ? ""
                : "<br/>"} I'm known as BOTAlex online
            </p>
            <p>
              Here's my CV: <a href="/cv?hideOnPrint=1" style="color:lightblue;"
                >pdf</a
              >
            </p>
          </span>
        </Profile>

        <Profile
          name="Sveske / Benjamin"
          tags={["Programmer", "Back-end Admin"]}
          isMobile={mobile}
        >
          <span>
            <p>
              <span class="inline line-through">Hi, I use Arch, btw. </span> I use
              NixOS now
            </p>
            <p>
              <!-- <a -->
              <!--   href="https://www.linkedin.com/in/benjamin-dreyer/" -->
              <!--   target="_blank" -->
              <!--   style="color:lightblue;">Linked-in</a -->
              <!-- > -->
            </p>
          </span>
        </Profile>

        <Profile isSnorre={true} tags={["Programmer"]} isMobile={mobile} />

        <Profile
          replaced={true}
          name="Oliver"
          tags={["Sound/Story", "2D Artist", "Programmer"]}
          isMobile={mobile}
        >
          <span>
            <p>Snorre does not get paid.</p>
            <p>
              <!-- <a -->
              <!--   href="https://www.linkedin.com/in/oliver-schwenger-291944278/" -->
              <!--   target="_blank" -->
              <!--   style="color:lightblue;">Linked-in</a -->
              <!-- > -->
              <br />
            </p>
          </span>
        </Profile>

        <Profile
          replaced={true}
          name="Kim"
          tags={["Cinemachine", "3D Artist", "Programmer"]}
          isMobile={mobile}
        >
          <span>
            <p>Abla espaniol</p>
            <p>
              <!-- <a -->
              <!--   href="https://www.linkedin.com/in/kim-rex-de-dios-408860299/" -->
              <!--   target="_blank" -->
              <!--   style="color:lightblue;">Linked-in</a -->
              <!-- > -->
              <br />
            </p>
          </span>
        </Profile>

        <Profile
          replaced={true}
          name="Zylvester"
          tags={["Sound/Story", "2D/3D artist"]}
          isMobile={mobile}
        >
          <span>
            <p>Used to draw furry commisions (Wasted potential)</p>
            <p>
              <!-- <a -->
              <!--   href="https://www.linkedin.com/in/sylvester-junge-0b2a73196/" -->
              <!--   target="_blank" -->
              <!--   style="color:lightblue;">Linked-in</a -->
              <!-- >, -->
              <!-- <a -->
              <!--   href="https://www.youtube.com/watch?v=xvFZjo5PgG0" -->
              <!--   style="color:lightblue;">Funny link</a -->
              <!-- > -->
              <br />
            </p>
          </span>
        </Profile>
      </div>

      <span class="opacity-20">¹ They don't do shit</span>
    </div>
  </div>

  <div class="py-4"></div>
  <div
    class="grid place-content-center place-items-center pointer-events-auto font-mono"
  >
    <!-- <article class="pt-16 prose overflow-hidden {mobile ? "px-8" : ""}">
        <h2 class="main-title {!mobile ? "text-center m-auto" : "m-0"}" style="font-size: {!mobile ? 3 : 3}rem; ">About us</h2>
        <p>We are a small group of developers and artists who started out as classmates, united by our passion for all things technology.</p>
    </article> -->

    <!-- Spacer -->
    <!-- <div style="width: 50%;" class="{!mobile ? "py-16" : "py-4"}">
        <ProfileSpacer/>
    </div> -->

    <!--   <article class="prose {mobile ? 'px-8' : ''}"> -->
    <!--     <h2 -->
    <!--       class="main-title {!mobile ? 'text-center m-auto' : 'm-0'}" -->
    <!--       style="font-size: {!mobile ? 3 : 3}rem; " -->
    <!--     > -->
    <!--       Games -->
    <!--     </h2> -->
    <!--     <p> -->
    <!--       Here are some of our games from various gamejams from the past. <br -->
    <!--       />(<span class="font-bold">ONLY</span> 48 hours per game) -->
    <!--     </p> -->
    <!--   </article> -->
    <!---->
    <!-- Spacer -->
    <!--   <div style="width: 50%;" class={!mobile ? "py-8" : "py-4"}></div> -->
    <!---->
    <!--   <div -->
    <!--     class="grid grid-flow-row gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" -->
    <!--   > -->
    <!-- Corro rebounce -->
    <!--     <div class="games card bg-base-100 shadow-xl"> -->
    <!--       <figure style="height: 15em;"> -->
    <!--         <Carousel images={[Corrobot1, Corrobot2, Corrobot3]} /> -->
    <!--       </figure> -->
    <!--       <div class="card-body"> -->
    <!--         <h2 class="card-title">Corrobot-rebounce</h2> -->
    <!--         <p>A 3D sequel to Corrobot-Takeover</p> -->
    <!--         <br /> -->
    <!--         <p> -->
    <!--           This was made during <a -->
    <!--             href="https://itch.io/jam/nordic-game-jam-2024/rate/2659665" -->
    <!--             class="underline">Nordic gamejam 2024</a -->
    <!--           > -->
    <!--         </p> -->
    <!--         <div class="card-actions justify-end"> -->
    <!--           <a -->
    <!--             href="https://botalex.itch.io/corrobot-rebounce" -->
    <!--             target="_blank" -->
    <!--             class="btn btn-primary text-primary-content">View on itch.io</a -->
    <!--           > -->
    <!--         </div> -->
    <!--       </div> -->
    <!--     </div> -->
    <!---->
    <!-- Blood -->
    <!--     <div class="games card bg-base-100 w-96 shadow-xl"> -->
    <!--       <figure style="height: 15em;"> -->
    <!--         <Carousel images={[Blood1, Blood2, Blood3, Blood4, Blood5]} /> -->
    <!--       </figure> -->
    <!--       <div class="card-body"> -->
    <!--         <h2 class="card-title">Unnamed blood game</h2> -->
    <!--         <p>A game based on an unique kind of combat</p> -->
    <!--         <br /> -->
    <!--         <p> -->
    <!--           This was made during <a -->
    <!--             href="https://itch.io/jam/future-game-makers-jam-2024" -->
    <!--             class="underline">Future Game Makers</a -->
    <!--           >, and of course our team won the competition. -->
    <!--         </p> -->
    <!--         <div class="card-actions justify-end"> -->
    <!--           <a -->
    <!--             href="https://botalex.itch.io/mop-of-the-dead" -->
    <!--             target="_blank" -->
    <!--             class="btn btn-primary text-primary-content">View on itch.io</a -->
    <!--           > -->
    <!--         </div> -->
    <!--       </div> -->
    <!--     </div> -->
    <!---->
    <!-- Time -->
    <!--     <div class="games card bg-base-100 w-96 shadow-xl"> -->
    <!--       <figure style="height: 15em;"> -->
    <!--         <Carousel images={[Time1, Time2, Time3, Time4, Time5]} /> -->
    <!--       </figure> -->
    <!--       <div class="card-body"> -->
    <!--         <h2 class="card-title">One More Time</h2> -->
    <!--         <p> -->
    <!--           What if time was money? A rougelike where you need to kill for time, -->
    <!--           which you can choose to spend. -->
    <!--         </p> -->
    <!--         <br /> -->
    <!--         <p> -->
    <!--           This was made during <a -->
    <!--             href="https://itch.io/jam/dmspiljam-november-2021" -->
    <!--             class="underline">Denmark Masters jam</a -->
    <!--           >. This jam has youths allover Denmark to compete, and of course our -->
    <!--           team won the competition again. -->
    <!--         </p> -->
    <!--         <div class="card-actions justify-end"> -->
    <!--           <a -->
    <!--             href="https://botalex.itch.io/one-more-time" -->
    <!--             target="_blank" -->
    <!--             class="btn btn-primary text-primary-content">View on itch.io</a -->
    <!--           > -->
    <!--         </div> -->
    <!--       </div> -->
    <!--     </div> -->
    <!---->
    <!--     <div class="games card bg-base-100 w-96 shadow-xl"> -->
    <!--       <figure class="rounded-b-none" style="height: 15em;"> -->
    <!--         <div class="bg-grid-100 flex w-full h-full"></div> -->
    <!--       </figure> -->
    <!--       <div class="card-body"> -->
    <!--         <h2 class="card-title">What's next?</h2> -->
    <!--         <div class="skeleton mt-1 h-4 w-28"></div> -->
    <!--         <div class="skeleton h-4 w-full"></div> -->
    <!--         <div class="skeleton h-4 w-full"></div> -->
    <!--         <div class="skeleton h-4 w-28"></div> -->
    <!--         <div class="skeleton h-4 w-full"></div> -->
    <!--         <div class="flex grow" /> -->
    <!--         <div class="card-actions justify-end"> -->
    <!--           <a -->
    <!--             href="/" -->
    <!--             target="_blank" -->
    <!--             class="btn btn-primary text-primary-content text-primary-content" -->
    <!--             >RECURSION!</a -->
    <!--           > -->
    <!--         </div> -->
    <!--       </div> -->
    <!--     </div> -->
    <!--   </div> -->
  </div>
</div>

{#if !mobile}
  <style>
    .games {
      width: 24rem /* 384px */;
    }
  </style>
{:else}
  <style>
    .games {
      width: 80%;
      display: flex;
      justify-self: center;
    }
  </style>
{/if}

<style>
  #backgroundGif {
    width: 100%;
    height: 100%;
    max-height: 40vh;
    object-fit: cover;
    filter: blur(5px) brightness(0.6);
  }
</style>
