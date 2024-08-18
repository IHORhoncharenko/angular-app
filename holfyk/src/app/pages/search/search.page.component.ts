import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSearchProducts } from '../../store/product-store/selectors';
import { ClearObservable } from '../../abstract/clear-observers.abstract';
import { filter, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductCardPreviewComponent } from '../../components/product-card-preview/product-card-preview.component';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.component.html',
  styleUrls: ['./search.page.component.css'],
  standalone: true,
  imports: [ProductCardPreviewComponent, BreadcrumbsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent extends ClearObservable implements OnInit {
  public searchProducts: Product[] | null | undefined;

  constructor(private store: Store, private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.store
      .select(selectSearchProducts)
      .pipe(
        takeUntil(this.destroy$),
        filter(
          (searchProducts) =>
            searchProducts !== undefined && searchProducts !== null
        )
      )
      .subscribe((searchProducts) => {
        this.searchProducts = [];
        this.searchProducts = searchProducts;
        this.cd.markForCheck();
      });
  }
}
