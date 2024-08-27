import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ClearObservable } from '../../abstract/clear-observers.abstract';
import { Store } from '@ngrx/store';
import { Product } from '../../models/product';
import {
  selectAllProducts,
  selectCategory,
} from '../../store/product-store/selectors';
import { filter, takeUntil } from 'rxjs';
import { ProductCardPreviewComponent } from '../../components/product-card-preview/product-card-preview.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { NavigationEnd, Router } from '@angular/router';
import { loadCategory } from '../../store/product-store/actions';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.page.component.html',
  styleUrls: ['./product-category.page.component.css'],
  standalone: true,
  imports: [ProductCardPreviewComponent, FilterComponent, BreadcrumbsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCategoryComponent
  extends ClearObservable
  implements OnInit
{
  public allProducts: Product[] | null | undefined;
  public choiceCategory: string | null | undefined;

  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.store
      .select(selectAllProducts)
      .pipe(
        takeUntil(this.destroy$),
        filter((products) => products !== null && products !== undefined)
      )
      .subscribe((products) => {
        this.allProducts = products;
      });

    this.store
      .select(selectCategory)
      .pipe(takeUntil(this.destroy$))
      .subscribe((category) => {
        this.choiceCategory = category;
        this.cd.markForCheck();
      });

    this.router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {
        if (!events.url.includes('category')) {
          this.store.dispatch(loadCategory({ selectedCategory: null }));
          this.cd.markForCheck();
        }
      }
    });
  }
}