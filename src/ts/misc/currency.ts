// Just going to hard code this

// Convertion values gotten at 10/11/2025
export enum CurrencyType {
  DKK = 1,
  EUR = 7.47,
  USD = 6.47,
  GBP = 8.5,
}

export function DkkToCurrency(value: number, target: CurrencyType): number {
  switch (target) {
    case CurrencyType.DKK:
      return value * CurrencyType.DKK;
    case CurrencyType.EUR:
      return value * CurrencyType.EUR;
    case CurrencyType.GBP:
      return value * CurrencyType.GBP;
    case CurrencyType.USD:
      return value * CurrencyType.USD;
  }
}

// import pb from "@ts/api/api";
// import type { ValueData } from "./ValueData";
//
// export class CurrencyConvert {
//   valueData: ValueData | undefined = undefined;
//
//   constructor() {}
//
//   static async RetreiveCurrencyData(): Promise<ValueData> {
//     const item = await pb.collection("misc").getFirstListItem(`ref="currency"`);
//     return ShopItem.fromJSON(item);
//   }
//
//   // DKK: baller
//   // target: ISO short thing. Fx. "EUR", "USD"
//   // Returns: Target equilavent
//   static async To(dkk: number, target: string): Promise<undefined | number> {
//     return undefined;
//   }
// }
//
//
//// iso: "USD", "EUR"
// value: What it is worth compared to 1 DKK
// interface DkkRelativeEqualivant {
//   iso: string;
//   value: number;
// }
//
// export interface ValueData {
//   data: DkkRelativeEqualivant[];
// }
//
