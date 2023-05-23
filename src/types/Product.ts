import { Category } from './Category';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export interface ProductsState {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  filterProduct: Product[];
  error?: string;
}

export interface ProductState {
  product: Product | null;
  isLoading: boolean;
  isError: boolean;
  error?: string;
}
