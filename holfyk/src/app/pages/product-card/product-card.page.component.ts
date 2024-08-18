import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { NgClass } from '@angular/common';
import { ClearObservable } from '../../abstract/clear-observers.abstract';
import { Product } from '../../models/product';
import { Store } from '@ngrx/store';
import { selectChoiceProduct } from '../../store/product-store/selectors';
import { filter, takeUntil } from 'rxjs';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.page.component.html',
  styleUrls: ['./product-card.page.component.css'],
  standalone: true,
  imports: [
    BreadcrumbModule,
    RouterModule,
    NgIf,
    NgClass,
    TabViewModule,
    CommonModule,
    ImageModule,
    BreadcrumbsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent extends ClearObservable implements OnInit {
  public product: Product | null | undefined;

  constructor(private cd: ChangeDetectorRef, private store: Store) {
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
      });
  }
}
