import { Product } from "./ProductResponse";

export interface ExtraOptions {
  text: string;
  price: number;
  _id: string;
}

// export interface CartProduct {
//   _id: string;
//   title: string;
//   desc: string;
//   img: string;
//   prices: number[];
//   extraOptions: ExtraOptions[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;

//   extras: ExtraOptions[];
//   price: number;
//   quantity: number;
// }

export interface Cart {
  products: Product[];
  quantity: number;
  total: number;
}
