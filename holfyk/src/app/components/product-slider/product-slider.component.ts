import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { ButtonModule } from "primeng/button";
import { CarouselModule } from "primeng/carousel";
import { TagModule } from "primeng/tag";
import { filter, takeUntil } from "rxjs";
import { ClearObservable } from "../../abstract/clear-observers.abstract";
import { Product } from "../../models/product";
import { selectAllProducts } from "../../store/product-store/selectors";

@Component({
  selector: "app-product-slider",
  templateUrl: "./product-slider.component.html",
  styleUrls: ["./product-slider.component.css"],
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSliderComponent extends ClearObservable implements OnInit {
  products: Product[] = [];
  responsiveOptions: any[] | undefined;

  constructor(
    private cd: ChangeDetectorRef,
    private store: Store,
  ) {
    super();
  }

  ngOnInit() {
    this.store
      .select(selectAllProducts)
      .pipe(
        takeUntil(this.destroy$),
        filter((pr) => pr !== null && pr !== undefined),
      )
      .subscribe((pr) => {
        if (pr) {
          [...pr].forEach((e) => {
            console.log(e.category);
            if (e.category === "jewelery") {
              this.products?.push(e);
            }
          });

          console.log(this.products);
        }
      });

    this.responsiveOptions = [
      {
        breakpoint: "1400px",
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: "1220px",
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: "1100px",
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
