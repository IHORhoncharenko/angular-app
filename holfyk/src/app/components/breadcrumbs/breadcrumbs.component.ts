import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgIf } from '@angular/common';
import { NgClass } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Product } from '../../models/product';
import { Store } from '@ngrx/store';
import {
  selectChoiceProduct,
  selectSearchProducts,
} from '../../store/product-store/selectors';
import { filter, takeUntil, tap } from 'rxjs';
import { ClearObservable } from '../../abstract/clear-observers.abstract';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
  standalone: true,
  imports: [BreadcrumbModule, NgIf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent extends ClearObservable implements OnInit {
  public product: Product | null | undefined;
  public isShowProductBreadcrumbs = false;

  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.store
      .select(selectChoiceProduct)
      .pipe(
        takeUntil(this.destroy$),
        filter((product) => product !== null && product !== undefined)
      )
      .subscribe((product) => {
        this.product = product;
        this.isShowProductBreadcrumbs = true;
      });
  }
}
