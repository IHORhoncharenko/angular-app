import { createReducer, on } from '@ngrx/store';
import * as productActions from './actions';
import { initialState } from './state';

export const ProductReducer = createReducer(
  initialState,
  on(productActions.load, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(productActions.searchProducts, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(productActions.updateTotal, (state, { total }) => {
    return { ...state, total };
  }),

  on(productActions.actionFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(productActions.select, (state, { selectedProductId }) => {
    return {
      ...state,
      selectedProductId,
    };
  })
);
