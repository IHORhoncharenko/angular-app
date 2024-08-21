import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Store } from '@ngrx/store';
import { selectAllProducts } from '../../store/product-store/selectors';
import { ClearObservable } from '../../abstract/clear-observers.abstract';
import { filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  standalone: true,
  imports: [],
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent extends ClearObservable implements OnInit {
  public allProductIds: number[] = [];

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    this.store
      .select(selectAllProducts)
      .pipe(
        takeUntil(this.destroy$),
        filter(
          (products): products is Product[] =>
            products !== undefined && products !== null
        )
      )
      .subscribe((products) => {
        products.forEach((p: Product) => {
          this.allProductIds?.push(p.id!);
        });
      });

    console.log(this.allProductIds);
  }
}
