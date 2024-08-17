import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './state';

export const productState = createFeatureSelector<ProductState>('productState');

export const selectAllProducts = createSelector(
  productState,
  (state) => state.allProducts
);
