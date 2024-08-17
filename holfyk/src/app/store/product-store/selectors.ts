import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { ProductState } from './state';

export const selectProductState =
  createFeatureSelector<ProductState>('product');

export const selectLoadPopularMovies = createSelector(
  selectProductState,
  (state) => state.allProducts
);
