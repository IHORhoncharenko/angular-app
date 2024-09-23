import { Product } from "../../models/product";

export interface ProductState {
  allProducts?: Product[] | null;
  sortingAllProducts?: Product[] | null;
  selectedProduct?: Product | null;
  selectedCategory?: string | null;
  searchQuery?: string | null;
  searchedProducts?: Product[] | null;
  productsInCart?: number[] | null;
  totalPrice?: number[] | null;
  sortingMethod?: string | null;
}

export const initialState: ProductState = {
  allProducts: null,
  sortingAllProducts: null,
  selectedProduct: null,
  selectedCategory: null,
  searchQuery: null,
  searchedProducts: null,
  productsInCart: null,
  totalPrice: null,
  sortingMethod: null,
};
