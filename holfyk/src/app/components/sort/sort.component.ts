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
import { distinctUntilChanged, takeUntil } from "rxjs";
import { ClearObservable } from "../../abstract/clear-observers.abstract";
import { SortVariation } from "../../models/sorting-variants.models";
import { loadSortingMethod } from "../../store/product-store/actions";

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
          this.store.dispatch(
            loadSortingMethod({
              sortingMethod: value.sortingElem,
            }),
          );
        }
      });
  }
}
