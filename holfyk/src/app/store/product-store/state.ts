import { Product } from '../../models/product';

export interface ProductState {
  allProducts?: Product[] | null;
  selectedProduct?: Product | null;
  query?: string | null;
  searchProducts?: Product[] | null;
  choiceCategory?: string | null;
}

export const initialState: ProductState = {
  allProducts: null,
  selectedProduct: null,
  query: null,
  searchProducts: null,
  choiceCategory: null,
};
