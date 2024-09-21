import { NgClass, NgIf } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { combineLatest, takeUntil } from "rxjs";
import { ClearObservable } from "../../abstract/clear-observers.abstract";
import { Product } from "../../models/product";
import { ValidUrlPipe } from "../../pipes/valid-url/valid-url.pipe";
import { loadCategory } from "../../store/product-store/actions";
import {
  selectCategory,
  selectProduct,
  selectSearchProducts,
} from "../../store/product-store/selectors";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.css"],
  standalone: true,
  imports: [BreadcrumbModule, NgIf, NgClass, ValidUrlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent extends ClearObservable implements OnInit {
  public viewState = [
    {
      isCategory: false,
      category: "",
    },
    {
      isProduct: false,
      product: {} as Product,
    },
    {
      isSearchProducts: false,
    },
    {
      isHome: false,
    },
  ];

  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
    private router: Router,
    private validUrlPipe: ValidUrlPipe,
  ) {
    super();
  }

  ngOnInit() {
    combineLatest([
      this.store.select(selectCategory),
      this.store.select(selectProduct),
      this.store.select(selectSearchProducts),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([category, product, searchProducts]) => {
        if (category) {
          this.viewState[0].isCategory = true;
          this.viewState[0].category = category;
          this.cd.detectChanges();
        }
        if (product) {
          this.viewState[1].isProduct = true;
          this.viewState[1].product = product;
          this.cd.detectChanges();
        }
        if (searchProducts) {
          this.viewState[2].isSearchProducts = true;
          this.cd.detectChanges();
        }
        if (!searchProducts && !product && !category) {
          this.viewState[3].isHome = true;
          this.cd.detectChanges();
        }
        this.cd.detectChanges();
      });
  }

  openCategory = (category: string) => {
    this.store.dispatch(loadCategory({ selectedCategory: category }));

    this.router.navigateByUrl(
      `/category/${this.validUrlPipe.transform(category)}`,
    );

    this.cd.markForCheck();
  };
}
