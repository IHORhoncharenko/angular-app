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
  on(storeActions.loadAllProductsSuccess, (state, { allProducts }) => {
    return {
      ...state,
      allProducts: allProducts,
    };
  }),
  on(storeActions.loadProduct, (state, { selectedProduct }) => {
    return {
      ...state,
      selectedProduct: selectedProduct,
    };
  }),
  on(storeActions.loadSearchedProducts, (state, { searchedProducts }) => {
    return {
      ...state,
      searchedProducts: searchedProducts,
    };
  }),
  on(storeActions.loadCategory, (state, { selectedCategory }) => {
    return {
      ...state,
      selectedCategory: selectedCategory,
    };
  }),
  on(storeActions.loadSearchQuery, (state, { searchQuery }) => {
    return {
      ...state,
      searchQuery: searchQuery,
    };
  }),
  on(storeActions.loadProductsToCart, (state, { productsInCart }) => {
    return {
      ...state,
      productsInCart: productsInCart,
    };
  })
);
