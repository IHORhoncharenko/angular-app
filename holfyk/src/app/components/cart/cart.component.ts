import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { NgClass, NgStyle } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  selectAllProducts,
  selectProductsInCart,
} from '../../store/product-store/selectors';
import { combineLatest, filter, forkJoin, takeUntil } from 'rxjs';
import { ClearObservable } from '../../abstract/clear-observers.abstract';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    DialogModule,
    NgClass,
    NgStyle,
    InputNumberModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent extends ClearObservable implements OnInit {
  public visible: boolean = false;
  public value3: number = 1;
  public productsInCart: Product[] = [];
  public shoppingCartQuantity: string | undefined;
  private productsInCartIds: number[] | null | undefined;
  private allProducts: Product[] | null | undefined;

  constructor(private store: Store, private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    combineLatest([
      this.store.select(selectProductsInCart),
      this.store.select(selectAllProducts),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([pCart, pAll]) => {
        this.productsInCartIds = pCart;
        this.allProducts = pAll;
        this.shoppingCartQuantity = String(this.productsInCartIds?.length);

        if (this.allProducts) {
          this.productsInCart = [];
          this.allProducts.forEach((product) => {
            if (this.productsInCartIds?.includes(Number(product.id))) {
              this.productsInCart.push(product);
            }
          });
        }

        this.cd.markForCheck();
      });
  }

  showDialog() {
    this.visible = true;
  }
}
