import { createReducer, on } from '@ngrx/store';
import * as storeActions from './actions';
import { initialState } from './state';

export const ProductReducer = createReducer(
  initialState,
  on(storeActions.actionFailure, (state, { error }) => {
    return {
      ...state,
      reviews: null,
      error: error,
    };
  }),
  on(storeActions.loadSuccess, (state, { allProducts }) => {
    return {
      ...state,
      allProducts: allProducts,
    };
  })
);