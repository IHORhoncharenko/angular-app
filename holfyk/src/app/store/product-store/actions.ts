import { createAction, props } from "@ngrx/store";
import { Product } from "../../models/product";

export enum ProductActionType {
  LoadProducts = "[Products API] Load all products...",
  LoadProductsSuccess = "[Products API] Load all products success",
  LoadSearchProducts = "[Search Page] Load searched products",
  LoadSelectedProduct = "[Product Page] Load selected product",
  LoadSelectedCategory = "[Category Component] Load selectd category",
  LoadSearchQuery = "[Other] Load searched query",
  AddProductsToCart = "[Listing] Add products to cart",
  RemoveProductsFromCart = "[Listing] Remove products from cart",
  UpdateTotalPrice = "[Cart] Update total price for one product position in cart",
  LoadSortingMethod = "[Listing] Selected sorting method in listing of products",
  LoadSortingProducts = "[Listing] Sorting and load all products",
  ActionFailure = "[Product API] Execute action failure",
}

export const actionFailure = createAction(
  ProductActionType.ActionFailure,
  props<{ error: string }>(),
);

export const loadAllProducts = createAction(ProductActionType.LoadProducts);

export const loadAllProductsSuccess = createAction(
  ProductActionType.LoadProductsSuccess,
  props<{ allProducts: Product[] | null }>(),
);

export const loadSearchedProducts = createAction(
  ProductActionType.LoadSearchProducts,
  props<{ searchedProducts: Product[] | null }>(),
);

export const loadProduct = createAction(
  ProductActionType.LoadSelectedProduct,
  props<{ selectedProduct: Product | null }>(),
);

export const loadCategory = createAction(
  ProductActionType.LoadSelectedCategory,
  props<{ selectedCategory: string | null }>(),
);

export const loadSearchQuery = createAction(
  ProductActionType.LoadSearchQuery,
  props<{ searchQuery: string | null }>(),
);

export const loadProductsToCart = createAction(
  ProductActionType.AddProductsToCart,
  props<{ productsInCart: number[] | null }>(),
);

export const clearProductsToCart = createAction(
  ProductActionType.RemoveProductsFromCart,
  props<{ productsInCart: number[] | null }>(),
);

export const loadSummTotalPrice = createAction(
  ProductActionType.UpdateTotalPrice,
  props<{ totalPrice: number[] | null }>(),
);

export const loadSortingMethod = createAction(
  ProductActionType.LoadSortingMethod,
  props<{
    sortingMethod: string | null;
  }>(),
);

export const loadSortingAllProducts = createAction(
  ProductActionType.LoadSortingProducts,
  props<{
    sortingAllProducts: Product[] | null;
  }>(),
);
