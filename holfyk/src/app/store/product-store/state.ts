import { Product } from '../../models/product';

export interface ProductState {
  allProducts?: [] | null;
  selectedProduct?: Product | null;
}

export const initialState: ProductState = {
  allProducts: null,
  selectedProduct: null,
};
