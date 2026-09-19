export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  imageURL: string;
  barcode?: string;
  sizes?: string[];
  colors?: string[];
  stock?: Record<string, number>;
  reviews?: ProductReview[];
}
