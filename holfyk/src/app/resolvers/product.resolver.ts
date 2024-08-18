import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Product } from '../models/product';
import { selectChoiceProduct } from '../store/product-store/selectors';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<Product> {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product> {
    return this.store.select(selectChoiceProduct).pipe(
      filter(
        (product): product is Product =>
          product !== null && product !== undefined
      ),
      take(1) // Забираємо перше значення, що не є null або undefined, і завершуємо Observable
    );
  }
}
