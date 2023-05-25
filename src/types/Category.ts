export interface CategoryData {
  name: string;
  image: string;
}

export interface Category extends CategoryData {
  id: number;
}

export interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;
  isLoading: boolean;
  isError: boolean;
}
