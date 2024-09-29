import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ButtonModule } from "primeng/button";
import { SidebarModule } from "primeng/sidebar";
import { filter, takeUntil } from "rxjs";
import { ClearObservable } from "../../abstract/clear-observers.abstract";
import { Product } from "../../models/product";
import { selectAllProducts } from "../../store/product-store/selectors";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  standalone: true,
  imports: [SidebarModule, ButtonModule],
  styleUrls: ["./filter.component.css"],
})
export class FilterComponent extends ClearObservable implements OnInit {
  public allProductIds: number[] = [];
  public sidebarVisible: boolean = false;

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
            products !== undefined && products !== null,
        ),
      )
      .subscribe((products) => {
        products.forEach((p: Product) => {
          this.allProductIds?.push(p.id!);
        });
      });
  }
}
