// This files is meant for interaction with pocketbase. I might split this into multiple files later
// It is meant to be called from stores.ts

import PocketBase from "pocketbase";
import ShopItem from "./classes/ShopItem";
const PUBLIC_POCKET_URL = "https://pocket.deprived.dev/";

export let pb = new PocketBase(PUBLIC_POCKET_URL);
export default pb;

console.log(PUBLIC_POCKET_URL);

export class ApiService {
  // read function name
  static async GetAllShopItems(): Promise<ShopItem[]> {
    const list = await pb.collection("shopItems").getList(1, 50, {});
    return list.items.map((rec: any) => ShopItem.fromJSON(rec));
  }

  static async GetShopItemFromUrlPath(url: string): Promise<ShopItem> {
    const item = await pb
      .collection("shopItems")
      .getFirstListItem(`product_url="${url}"`);
    return ShopItem.fromJSON(item);
  }
}
