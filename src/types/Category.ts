export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
}
