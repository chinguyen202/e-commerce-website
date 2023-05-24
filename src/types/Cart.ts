import { Product } from './Product';

export interface Cart {
  cartItem: Product[];
  amount: number;
  totalPrice: number;
  isLoading: boolean;
}
