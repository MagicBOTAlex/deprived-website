<script lang="ts">
  import onMount from "@e/onMount";

  let cart = {
    trackers: 0,
    receivers: 0,
  };

  function sanityCheck() {
    Object.keys(cart).forEach((k) => (cart[k] = Math.max(0, cart[k] || 0)));
  }

  onMount(async () => {
    console.log(window.location.href);
  });
</script>

<div class="grid grid-cols-6 gap-8 items-center gap-x-16 pt-32 lg:px-32">
  {#each { length: 6 } as i}
    <div
      class="w-48 h-48 bg-blue-500 justify-self-end max-md:col-start-3"
    ></div>
    <div class="flex flex-col">
      <div class="justify-self-start flex flex-col w-full col-start-4">
        <div>Tracker</div>
        <div>NRF52840 + ICM45856</div>
        <div class="flex items-center gap-4">
          <div class="flex flex-col">
            <div>200DKK</div>
            <div class="flex text-sm">
              <div>20GBP</div>
              <div>25USD</div>
            </div>
          </div>
          <div class="flex join">
            <button
              class="join-item btn btn-xs btn-primary"
              on:click={() => {
                cart.trackers--;
                sanityCheck();
              }}>-</button
            >
            <div class="join-item input input-xs input-disable cursor-default">
              {cart.trackers}
            </div>
            <button
              class="join-item btn btn-xs btn-primary"
              on:click={() => {
                cart.trackers++;
                sanityCheck();
              }}>+</button
            >
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
{#if false}
  <!-- This just visualizes the current tailwind breakpoint -->
  <div
    class="back-to-top text-content rounded-full bg-base-300 p-4 border-secondary border-2 text-primary transition-all duration-300 z-50 fixed"
  >
    <span style="font-size: 2rem;" class="block sm:hidden"><b>Default</b></span>
    <span style="font-size: 2rem;" class="hidden sm:block md:hidden"
      ><b>SM</b></span
    >
    <span style="font-size: 2rem;" class="hidden md:block lg:hidden"
      ><b>MD</b></span
    >
    <span style="font-size: 2rem;" class="hidden lg:block xl:hidden"
      ><b>LG</b></span
    >
    <span style="font-size: 2rem;" class="hidden xl:block 2xl:hidden"
      ><b>XL</b></span
    >
    <span style="font-size: 2rem;" class="hidden 2xl:block"><b>2XL</b></span>
  </div>
{/if}
