import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, retry, switchMap, tap } from 'rxjs/operators';
import * as storeActions from './actions';
import { ProductService } from '../../services/product-services/product-services.service';

@Injectable()
export class ProductEffects {
  products$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadAllProducts),
      switchMap(() => {
        return this.productService.getAllProducts().pipe(
          tap(() => {
            console.log(
              `%c Get all products ...`,
              `color: red; font-weight: 700`
            );
          }),
          retry(8),
          map((data) => {
            console.log(
              `%c allProducts >>> success`,
              `color: green; font-weight: 700`,
              data
            );
            return storeActions.loadAllProductsSuccess({
              allProducts: data,
            });
          }),

          catchError((error) =>
            of(
              storeActions.actionFailure({
                error,
              })
            )
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
