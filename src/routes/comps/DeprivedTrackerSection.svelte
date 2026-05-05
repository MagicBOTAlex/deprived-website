<script>
    import onMount from "@e/onMount";

    let debug = false;

    onMount(()=> {
        let tabTittleElement = window.document.getElementById("TabTittle");
            if (tabTittleElement) // Not null
        tabTittleElement.innerHTML = "Deprived devs";

      const params = new URLSearchParams(window.location.search);
      debug = params.has('debug');
    });

</script>

<!-- Desktop -->
<div class="{debug? "" : "hidden"} max-md:hidden cozette flex flex-col justify-center items-center w-full md:px-8 pt-4">
  
  <div class="grid grid-cols-2 items-center">
    <div>
      <img src="https://placehold.co/400x400/000000/FFFFFF" alt="">
    </div>
    <div class="flex flex-col">
      <div>
        <h2 class="font-semibold text-base-content text-xl">Deprived Trackers</h2>
        <span class="text-base-content">
          Hopefully the cheapest Smol-type SlimeVR Trackers on the market.
        </span>
      </div>
      <div class="py-2"></div>
      <div class="flex justify-center gap-2">
        <a href="/" class="btn btn-secondary">Buy</a>
        <a href="/shop/trackers" class="btn btn-primary">Learn more</a>
      </div>

    </div>
  </div>
</div>

<!-- Mobile -->
<div class="{debug? "" : "hidden"} md:hidden cozette flex flex-col justify-center items-center w-full md:px-8 pt-4">
  
  <div class="relative grid items-center max-w-64">
    <div class="blur-xs">
      <img src="https://placehold.co/400x400/000000/FFFFFF" alt="">
    </div>
    <div class="absolute flex flex-col justify-between h-full p-8">
      <div>
        <h2 class="font-semibold text-base-content">Deprived Trackers</h2>
        <span class="text-base-content">
          Hopefully the cheapest Smol-type SlimeVR Trackers on the market.
        </span>
      </div>
      <div class="py-2"></div>
      <div class="flex justify-center gap-2">
        <a href="/" class="btn btn-secondary">Buy</a>
        <a href="/shop/trackers" class="btn btn-primary">Learn more</a>
      </div>

    </div>
  </div>
</div>
