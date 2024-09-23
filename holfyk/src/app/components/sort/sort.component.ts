import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { DropdownModule } from "primeng/dropdown";
import { MultiSelectModule } from "primeng/multiselect";
import { RatingModule } from "primeng/rating";
import { SelectButtonModule } from "primeng/selectbutton";
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  takeUntil,
  tap,
} from "rxjs";
import { ClearObservable } from "../../abstract/clear-observers.abstract";
import { Product } from "../../models/product";
import { SortVariation } from "../../models/sorting-variants.models";
import {
  loadSortingAllProducts,
  loadSortingMethod,
} from "../../store/product-store/actions";
import {
  selectAllProducts,
  selectSortingAllProducts,
  selectSortingMethod,
} from "../../store/product-store/selectors";

@Component({
  selector: "app-sort",
  standalone: true,
  templateUrl: "./sort.component.html",
  styleUrls: ["./sort.component.css"],
  imports: [
    ReactiveFormsModule,
    MultiSelectModule,
    RatingModule,
    DropdownModule,
    SelectButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortComponent extends ClearObservable implements OnInit {
  public sorting: SortVariation[] | undefined;
  public sortProducts!: FormGroup;
  public allProducts: Product[] | null | undefined;

  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit() {
    this.sorting = [
      { label: "rating", sortingVariant: "rating" },
      { label: "default", sortingVariant: "default" },
    ];

    this.sortProducts = new FormGroup({
      sortingElem: new FormControl("default", []),
    });

    this.store.dispatch(
      loadSortingMethod({ sortingMethod: this.sortProducts.value.sortingElem }),
    );

    // Підписка на всі продукти
    this.store
      .select(selectAllProducts)
      .pipe(
        takeUntil(this.destroy$),
        filter((products) => products !== undefined && products !== null),
        tap((products) => {
          if (products) {
            this.store.dispatch(
              loadSortingAllProducts({
                sortingAllProducts: products,
              }),
            );
          }
        }),
      )
      .subscribe();

    // Підписка на зміну методу сортування
    this.sortProducts.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(
          (prev, curr) => prev.sortingElem === curr.sortingElem,
        ), // Уникнення повторного виклику на однакове значення
      )
      .subscribe((value) => {
        if (value.sortingElem) {
          // this.store.dispatch(
          //   loadSortingMethod({
          //     sortingMethod: value.sortingElem,
          //   }),
          // );
        }
      });

    // Підписка на відсортовані продукти та метод сортування
    combineLatest([
      this.store.select(selectSortingAllProducts),
      this.store.select(selectSortingMethod),
    ])
      .pipe(
        takeUntil(this.destroy$),
        filter(
          ([products, method]) =>
            products !== undefined &&
            products !== null &&
            method !== undefined &&
            method !== null,
        ),
      )
      .subscribe(([products, method]) => {
        if (products && method) {
          if (method === "rating") {
            console.log(products);
            this.store.dispatch(
              loadSortingAllProducts({
                sortingAllProducts: [...products].sort(this.compare),
              }),
            );
          } else {
            console.log(products);
            this.store.dispatch(
              loadSortingAllProducts({ sortingAllProducts: products }),
            );
          }
          this.cd.markForCheck(); // Примусове оновлення для ChangeDetectionStrategy.OnPush
        }
      });
  }

  compare = (a: Product, b: Product) => {
    if (a.rating && b.rating && a.rating.rate && b.rating.rate) {
      if (a.rating.rate < b.rating.rate) {
        return 1;
      }
      if (a.rating.rate > b.rating.rate) {
        return -1;
      }
      return 0;
    } else {
      return 0;
    }
  };
}
