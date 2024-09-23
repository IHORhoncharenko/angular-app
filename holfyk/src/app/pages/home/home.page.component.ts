import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { filter, takeUntil } from "rxjs";
import { ClearObservable } from "../../abstract/clear-observers.abstract";
import { BreadcrumbsComponent } from "../../components/breadcrumbs/breadcrumbs.component";
import { ProductCardPreviewComponent } from "../../components/product-card-preview/product-card-preview.component";
import { Product } from "../../models/product";
import { selectSortingAllProducts } from "../../store/product-store/selectors";

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
    this.store
      .select(selectSortingAllProducts)
      .pipe(
        takeUntil(this.destroy$),
        filter((products) => products !== null && products !== undefined),
      )
      .subscribe((products) => {
        this.allProducts = products;
        this.cd.markForCheck();
      });
  }
}
