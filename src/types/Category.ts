import { Product } from './Product';
export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface CategoryState {
  categories: Category[];
  productsByCategory: Product[];
  isLoading: boolean;
  isError: boolean;
  error?: string;
}
