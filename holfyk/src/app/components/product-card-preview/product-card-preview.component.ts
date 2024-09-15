import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Product } from '../../models/product';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Router, RouterLink } from '@angular/router';
import { ClearObservable } from '../../abstract/clear-observers.abstract';
import {
  loadProduct,
  loadProductsToCart,
} from '../../store/product-store/actions';
import { selectProductsInCart } from '../../store/product-store/selectors';
import { filter, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-card-preview',
  templateUrl: './product-card-preview.component.html',
  styleUrls: ['./product-card-preview.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RatingModule,
    CardModule,
    ButtonModule,
    TagModule,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardPreviewComponent
  extends ClearObservable
  implements OnInit
{
  @Input()
  productData: Product | undefined | null;

  public allProducts: Product[] | undefined | null;
  public ratingGroup!: FormGroup;
  public selectedTag: string[] = [];
  public isBuy = false;
  public cart: number[] | null | undefined;
  private productsInCart: number[] = [];

  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.ratingGroup = new FormGroup({
      value: new FormControl(
        Math.round(Number(this.productData?.rating?.rate))
      ),
    });

    if (typeof window !== 'undefined') {
      this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (this.cart) {
        this.store.dispatch(loadProductsToCart({ productsInCart: this.cart }));

        this.store
          .select(selectProductsInCart)
          .pipe(takeUntil(this.destroy$))
          .subscribe((products) => {
            if (!products || products.length === 0) {
              this.isBuy = false;
              this.cd.markForCheck();
            } else {
              if (this.productData && products && products.length > 0) {
                if (products.includes(this.productData.id!)) {
                  this.isBuy = true;
                  this.cd.markForCheck();
                } else {
                  this.isBuy = false;
                  this.cd.markForCheck();
                }
              }
            }
          });
      }
    }

    if (this.productData && this.productData.id! % 2 === 0) {
      //test
      this.selectedTag.push('New');
      this.selectedTag.push('Popular');
    } else {
      this.selectedTag.push('Discount');
    }
  }

  openCard = (productId: number) => {
    this.router.navigateByUrl(`/product/${productId}`);
    if (this.productData) {
      this.store.dispatch(loadProduct({ selectedProduct: this.productData }));
    }
  };

  addToCart = (productID: number) => {
    if (typeof window !== 'undefined') {
      // Отримуємо існуючий масив продуктів з локального сховища або створюємо новий
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');

      // Перевіряємо, чи є cart масивом, якщо ні, ініціалізуємо порожній масив
      if (!Array.isArray(cart)) {
        cart = [];
      }

      // Додаємо новий продукт до масиву
      cart.push(productID);

      // Зберігаємо оновлений масив у локальне сховище
      localStorage.setItem('cart', JSON.stringify(cart));

      // Оновлюємо локальний масив продуктів у корзині
      this.productsInCart = cart;
      this.store.dispatch(
        loadProductsToCart({ productsInCart: this.productsInCart })
      );
    }
  };

  removeFromCart = (productID: number) => {
    if (typeof window !== 'undefined') {
      // Отримуємо існуючий масив продуктів з локального сховища або створюємо новий
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');

      let searchIndex = cart.findIndex((elem: number) => elem === productID);

      if (searchIndex !== -1) {
        cart.splice(searchIndex, 1);
        // Зберігаємо оновлений масив у локальне сховище
        localStorage.setItem('cart', JSON.stringify(cart));

        // Оновлюємо локальний масив продуктів у корзині
        this.productsInCart = cart;
        this.store.dispatch(
          loadProductsToCart({ productsInCart: this.productsInCart })
        );
      }
    }
  };
}
