<script lang="ts">
  import onMount from "@e/onMount";
  import ShopItemCard from "./comps/ShopItemCard.svelte";
  import { api } from "@stores";
  import ShopItem from "@src/ts/api/classes/ShopItem";

  let allItems: undefined | ShopItem[] = undefined;

  onMount(async () => {
    allItems = await api.GetAllShopItems();
    console.log(allItems);
  });
</script>

<div class="p-8 flex w-full justify-center">
  <div class="text-4xl cozette">Items</div>
</div>

<div class="flex w-full justify-center">
  <div class="grid grid-cols-2 gap-8">
    {#if allItems != undefined}
      {#each allItems as item, i}
        <ShopItemCard bind:shopItem={item} />
      {/each}
    {:else}
      <div></div>
    {/if}
  </div>
</div>
