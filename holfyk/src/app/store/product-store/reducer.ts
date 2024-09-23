import { createReducer, on } from "@ngrx/store";
import * as storeActions from "./actions";
import { initialState } from "./state";

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
  }),
  on(storeActions.clearProductsToCart, (state, { productsInCart }) => {
    return {
      ...state,
      productsInCart: productsInCart,
    };
  }),
  on(storeActions.loadSummTotalPrice, (state, { totalPrice }) => {
    return {
      ...state,
      totalPrice: totalPrice,
    };
  }),
  on(storeActions.loadSortingMethod, (state, { sortingMethod }) => {
    return {
      ...state,
      sortingMethod: sortingMethod,
    };
  }),
  on(storeActions.loadSortingAllProducts, (state, { sortingAllProducts }) => {
    return {
      ...state,
      sortingAllProducts: sortingAllProducts,
    };
  }),
);
