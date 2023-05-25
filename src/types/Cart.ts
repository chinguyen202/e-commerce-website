import { Product } from './Product';

export interface CartItemI extends Product {
  amount: number;
}
export interface Cart {
  cartItems: CartItemI[];
  totalAmount: number;
  total: number;
  isLoading: boolean;
}

export interface CartAction {
  product: Product;
  amount: number;
}
