import mongoose from "mongoose";

export interface ExtraOptions {
  text: string;
  price: number;
  _id: string;
}

export interface Product {
  _id: string;
  title: string;
  desc: string;
  img: string;
  prices: Array<number>;
  extraOptions: ExtraOptions[];
  createdAt: string;
  updatedAt: string;
  __v: number;

  extras: ExtraOptions[];
  price: number;
  quantity: number;
}
