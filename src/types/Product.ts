import { Category } from './Category';

export interface ProductData {
  id: number;
  data: Partial<Product>;
}
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}
export interface FilterOptions {
  minPrice: number;
  maxPrice: number;
  category: Category | null;
}
export interface ProductsState {
  products: Product[];
  product: Product | null;
  isLoading: boolean;
  isError: boolean;
  error?: string;
  filterProducts: Product[];
  sortedProducts: Product[];
  isFilter: boolean;
  isSort: boolean;
  gridView: boolean;
  filterOptions: FilterOptions;
  categories: Category[];
  productsByCategory: Product[];
}

export type ProductsProps = {
  products: Product[];
};

export interface SortPayload {
  sortType: 'NAME_ASC' | 'NAME_DESC' | 'PRICE_HIGHEST' | 'PRICE_LOWEST';
}
