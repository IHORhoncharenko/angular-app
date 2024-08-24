import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgIf } from '@angular/common';
import { NgClass } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Product } from '../../models/product';
import { Store } from '@ngrx/store';
import {
  selectChoiceCategory,
  selectChoiceProduct,
  selectSearchProducts,
} from '../../store/product-store/selectors';
import { combineLatest, filter, forkJoin, takeUntil, tap } from 'rxjs';
import { ClearObservable } from '../../abstract/clear-observers.abstract';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
  standalone: true,
  imports: [BreadcrumbModule, NgIf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent extends ClearObservable implements OnInit {
  public viewState = [
    {
      isCategory: false,
      category: '',
    },
    {
      isProduct: false,
      product: {} as Product,
    },
    {
      isSearchProducts: false,
      searchProducts: {},
    },
  ];

  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    combineLatest([
      this.store.select(selectChoiceCategory),
      this.store.select(selectChoiceProduct),
      this.store.select(selectSearchProducts),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([category, product, searchProducts]) => {
        if (category) {
          this.viewState[0].isCategory = true;
          this.viewState[0].category = category;
        }
        if (product) {
          this.viewState[1].isProduct = true;
          this.viewState[1].product = product;
        }
        if (searchProducts) {
          this.viewState[2].isSearchProducts = true;
          this.viewState[2].searchProducts = searchProducts;
        }
        this.cd.detectChanges();
      });

    console.log(this.viewState);
  }
}
