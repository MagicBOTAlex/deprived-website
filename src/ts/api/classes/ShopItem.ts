import { ParseAssetUrl } from "@src/ts/Helper";

export class ShopItem {
  item_name: string;
  short_desc: string;
  preview_image: string;
  page_url: string; // the url used for the item
  images_root: string; // might not be optimal to include this, in the same class, but should be fine, for now at least
  category: string[];
  sold_quantity: number;
  stock: number;
  unlisted: boolean;

  constructor(
    item_name: string,
    short_desc: string,
    preview_image: string,
    redirect: string,
    images_root: string,
    category: string[],
    sold_quantity: number,
    stock: number,
    unlisted: boolean,
  ) {
    this.item_name = item_name;
    this.short_desc = short_desc;
    this.preview_image = preview_image;
    this.page_url = redirect;
    this.images_root = images_root;
    this.category = category;
    this.sold_quantity = sold_quantity;
    this.stock = stock;
    this.unlisted = unlisted;
  }

  static fromJSON(json: any): ShopItem {
    return new ShopItem(
      json.item_name,
      json.short_desc,
      ParseAssetUrl(json.preview_image, "/assets/shop/preview-images"),
      json.page_url,
      ParseAssetUrl(json.images_root, "/assets/shop/" + json.item_name + "/"), // Please use better paths
      json.category,
      json.sold_quantity,
      json.stock,
      json.unlisted,
    );
  }
}

export default ShopItem;
