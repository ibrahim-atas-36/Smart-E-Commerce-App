import type { Product } from "./product";

export interface DeliveryAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface Order {
  id: string;
  createdAt: string;
  status: "Processing" | "Shipped" | "Delivered";
  products: Product[];
  subtotal: number;
  discount: number;
  total: number;
  address: DeliveryAddress;
  paymentLabel: string;
}
