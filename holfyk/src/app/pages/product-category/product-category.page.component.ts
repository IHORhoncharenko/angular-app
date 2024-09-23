import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { concatMap, filter, takeUntil, tap } from "rxjs";
import { ClearObservable } from "../../abstract/clear-observers.abstract";
import { BreadcrumbsComponent } from "../../components/breadcrumbs/breadcrumbs.component";
import { FilterComponent } from "../../components/filter/filter.component";
import { ProductCardPreviewComponent } from "../../components/product-card-preview/product-card-preview.component";
import { Product } from "../../models/product";
import {
  selectCategory,
  selectSortingAllProducts,
} from "../../store/product-store/selectors";

@Component({
  selector: "app-product-category",
  templateUrl: "./product-category.page.component.html",
  styleUrls: ["./product-category.page.component.css"],
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
  ) {
    super();
  }

  ngOnInit() {
    this.store
      .select(selectSortingAllProducts)
      .pipe(
        takeUntil(this.destroy$),
        filter((products) => products !== null && products !== undefined),
        tap((products) => {
          this.allProducts = products;
          this.cd.markForCheck();
        }),
        concatMap(() => {
          return this.store.select(selectCategory);
        }),
        filter(
          (selectCategory) =>
            selectCategory !== null && selectCategory !== undefined,
        ),
      )
      .subscribe((selectCategory) => {
        this.choiceCategory = selectCategory;
        this.cd.markForCheck();
      });
  }
}
