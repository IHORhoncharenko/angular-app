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

    //test
    if (this.productData && this.productData.id! % 2 === 0) {
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
  };
}
