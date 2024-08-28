import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product';

export enum ProductActionType {
  Load = '[Product Component] Load',
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
  props<{ searchedProducts: any[] | null }>()
);

export const loadAllProductsSuccess = createAction(
  ProductActionType.LoadSuccess,
  props<{ allProducts: any | null }>()
);

export const loadProduct = createAction(
  ProductActionType.Selected,
  props<{ selectedProduct: Product | null }>()
);

export const loadCategory = createAction(
  ProductActionType.Load,
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
