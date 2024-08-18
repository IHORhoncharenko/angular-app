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

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  standalone: true,
  imports: [
    BreadcrumbModule,
    RouterModule,
    NgIf,
    NgClass,
    TabViewModule,
    CommonModule,
    ImageModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent extends ClearObservable implements OnInit {
  constructor(private cd: ChangeDetectorRef, private store: Store) {
    super();
  }

  public items: MenuItem[] | undefined;
  public home: MenuItem | undefined;
  public product: Product | null | undefined;

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

    this.items = [
      { icon: 'pi pi-home', route: '/' },
      { label: `${this.product?.category}`, route: '/' },
      { label: `${this.product?.title}` },
    ];
  }
}
