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

export const load = createAction(ProductActionType.Load);
export const searchProducts = createAction(
  ProductActionType.SearchProducts,
  props<{ query: Product }>()
);

export const createProduct = createAction(
  ProductActionType.CreateProduct,
  props<{ product: Product; ref: any }>()
);

export const actionFailure = createAction(
  ProductActionType.ActionFailure,
  props<{ error: string }>()
);

export const actionSuccess = createAction(
  ProductActionType.ActionSuccess,
  props<{ msg: string }>()
);

export const updateTotal = createAction(
  ProductActionType.UpdateTotal,
  props<{ total: number }>()
);

export const loadSuccess = createAction(
  ProductActionType.LoadSuccess,
  props<{ allProducts: any }>()
);

export const submitSuccess = createAction(
  ProductActionType.SubmitSuccess,
  props<{ msg: string }>()
);

export const refresh = createAction(ProductActionType.Refresh);

export const select = createAction(
  ProductActionType.Selected,
  props<{ selectedProductId: string | number }>()
);

export const updateProduct = createAction(
  ProductActionType.UpdateProduct,
  props<{ product: Product; ref: any }>()
);
