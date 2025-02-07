export interface Product {
  _id: string;
  name: string;
  price: number;
  discountPercent: number;
  image: { asset: { url: string } };
  sizes: string[];
  colors: string[];
  isNew: boolean;
  description?: string;
  category: string;
}