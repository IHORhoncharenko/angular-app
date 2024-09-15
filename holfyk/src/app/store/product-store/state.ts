import { Product } from '../../models/product';

export interface ProductState {
  allProducts?: Product[] | null;
  selectedProduct?: Product | null;
  selectedCategory?: string | null;
  searchQuery?: string | null;
  searchedProducts?: Product[] | null;
  productsInCart?: number[] | null;
  totalPrice?: number | null;
}

export const initialState: ProductState = {
  allProducts: null,
  selectedProduct: null,
  selectedCategory: null,
  searchQuery: null,
  searchedProducts: null,
  productsInCart: null,
  totalPrice: null,
};
