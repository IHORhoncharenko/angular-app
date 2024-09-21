import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product';
import { SortVariation } from '../../models/sorting-variants.models';

export enum ProductActionType {
  Load = '[Product Component] Load',
  LoadCategory = '[Category Component] Load',
  SearchProducts = '[Product Component] Search Product',
  UpdateProduct = '[Product Component] Update Product',
  CreateProduct = '[Product Component] Create Product',
  UpdateTotal = '[Product Component] Update Total',
  ActionFailure = '[Product API] Execute action failure',
  ActionSuccess = '[Product API] Execute action success',
  LoadSuccess = '[Product API] Load Success',
  Refresh = '[Product Page] Refresh',
  Selected = '[Product Page] Select',
  SubmitSuccess = '[Product API] Submit Success',
}

export const loadAllProducts = createAction(ProductActionType.Load);

export const actionFailure = createAction(
  ProductActionType.ActionFailure,
  props<{ error: string }>()
);

export const actionSuccess = createAction(
  ProductActionType.ActionSuccess,
  props<{ msg: string }>()
);

export const loadSearchedProducts = createAction(
  ProductActionType.SearchProducts,
  props<{ searchedProducts: Product[] | null }>()
);

export const loadAllProductsSuccess = createAction(
  ProductActionType.LoadSuccess,
  props<{ allProducts: Product[] | null }>()
);

export const loadProduct = createAction(
  ProductActionType.Selected,
  props<{ selectedProduct: Product | null }>()
);

export const loadCategory = createAction(
  ProductActionType.LoadCategory,
  props<{ selectedCategory: string | null }>()
);

export const loadSearchQuery = createAction(
  ProductActionType.Load,
  props<{ searchQuery: string | null }>()
);

export const loadProductsToCart = createAction(
  ProductActionType.Load,
  props<{ productsInCart: number[] | null }>()
);

export const clearProductsToCart = createAction(
  ProductActionType.Load,
  props<{ productsInCart: number[] | null }>()
);

export const summTotalPrice = createAction(
  ProductActionType.Load,
  props<{ totalPrice: number[] | null }>()
);

export const selectedSortingMethod = createAction(
  '[Movie] Select sorting movie',
  props<{
    sortingMethod: SortVariation | null;
  }>()
);
