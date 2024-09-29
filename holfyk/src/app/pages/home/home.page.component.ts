import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, filter, takeUntil } from "rxjs";
import { ClearObservable } from "../../abstract/clear-observers.abstract";
import { BreadcrumbsComponent } from "../../components/breadcrumbs/breadcrumbs.component";
import { ProductCardPreviewComponent } from "../../components/product-card-preview/product-card-preview.component";
import { Product } from "../../models/product";
import {
  selectAllProducts,
  selectSortingMethod,
} from "../../store/product-store/selectors";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.component.html",
  styleUrls: ["./home.page.component.css"],
  standalone: true,
  imports: [ProductCardPreviewComponent, BreadcrumbsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends ClearObservable implements OnInit {
  public allProducts: Product[] | null | undefined;

  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit() {
    combineLatest([
      this.store.select(selectAllProducts),
      this.store.select(selectSortingMethod),
    ])
      .pipe(
        takeUntil(this.destroy$),
        filter(
          ([products, method]) =>
            products !== undefined &&
            products !== null &&
            method !== null &&
            method !== undefined,
        ),
      )
      .subscribe(([products, method]) => {
        if (products) {
          switch (method) {
            case "default":
              this.allProducts = products;
              break;
            case "rating":
              this.allProducts = [...products].sort(
                (a: Product, b: Product) => {
                  const aRating = a.rating?.rate ?? 0;
                  const bRating = b.rating?.rate ?? 0;

                  if (aRating > bRating) {
                    return -1;
                  }
                  if (aRating < bRating) {
                    return 1;
                  }
                  return 0;
                },
              );
              break;

            default:
              break;
          }
        }

        this.cd.markForCheck();
      });
  }
}
