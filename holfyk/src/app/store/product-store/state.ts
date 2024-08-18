import { Product } from '../../models/product';

export interface ProductState {
  allProducts?: [] | null;
  selectedProduct?: Product | null;
  query?: string | null;
  searchProducts?: any[] | null;
}

export const initialState: ProductState = {
  allProducts: null,
  selectedProduct: null,
  query: null,
  searchProducts: null,
};
