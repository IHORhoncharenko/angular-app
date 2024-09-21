import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import { ClearObservable } from '../../abstract/clear-observers.abstract';
import { SortVariation } from '../../models/sorting-variants.models';
import { selectedSortingMethod } from '../../store/product-store/actions';


@Component({
  selector: 'app-sort',
  standalone: true,
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css'],
  imports: [
    ReactiveFormsModule,
    MultiSelectModule,
    RatingModule,
    DropdownModule,
  ],
})
export class SortComponent extends ClearObservable implements OnInit {

  public sorting: SortVariation[] | undefined;
  public sortProducts!: FormGroup;

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    this.sortProducts = new FormGroup({
      selectedSortMethod: new FormControl('', []),
    });

    this.sorting = [{ sortingMethod: 'rating' }, { sortingMethod: 'default' }];

  }

  onSubmit = () => {
    this.store.dispatch(
      selectedSortingMethod({
        sortingMethod: this.sortProducts.value.selectedSortMethod,
      })
    );
  };
}
