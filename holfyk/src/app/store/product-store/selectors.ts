import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './state';

export const productState = createFeatureSelector<ProductState>('productState');

export const selectAllProducts = createSelector(
  productState,
  (state) => state.allProducts
);

export const selectProduct = createSelector(
  productState,
  (state) => state.selectedProduct
);

export const selectCategory = createSelector(
  productState,
  (state) => state.selectedCategory
);

export const selectSearchProducts = createSelector(
  productState,
  (state) => state.searchedProducts
);

export const selectProductsInCart = createSelector(
  productState,
  (state) => state.productsInCart
);

export const selectTotalPrice = createSelector(
  productState,
  (state) => state.totalPrice
);
