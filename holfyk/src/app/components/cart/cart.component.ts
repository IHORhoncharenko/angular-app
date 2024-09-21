import { CommonModule, NgClass, NgStyle } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputNumberModule } from "primeng/inputnumber";
import { combineLatest, takeUntil } from "rxjs";
import { ClearObservable } from "../../abstract/clear-observers.abstract";
import { Product } from "../../models/product";
import { clearProductsToCart } from "../../store/product-store/actions";
import {
  selectAllProducts,
  selectProductsInCart,
} from "../../store/product-store/selectors";
import { ProductPrevCartComponent } from "../product-prev-cart/product-prev-cart.component";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [
    DialogModule,
    NgClass,
    NgStyle,
    InputNumberModule,
    ButtonModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ProductPrevCartComponent,
  ],
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent extends ClearObservable implements OnInit {
  public visible: boolean = false;
  public quantity: number = 1;
  public productsInCart: Product[] = [];
  public shoppingCartQuantity: string | undefined;
  public totalPrice: number = 0;
  public sumPrice: number | null | undefined;
  public totalPriceInCart!: FormGroup;
  private productsInCartIds: number[] | null | undefined;
  private allProducts: Product[] | null | undefined;

  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit() {
    this.totalPriceInCart = new FormGroup({
      quantity: new FormControl(1, Validators.min(1)),
      sumPrice: new FormControl(""),
    });

    combineLatest([
      this.store.select(selectProductsInCart),
      this.store.select(selectAllProducts),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([pCart, pAll]) => {
        this.productsInCartIds = pCart;
        this.allProducts = pAll;
        this.totalPrice = 0;

        if (this.productsInCartIds) {
          this.shoppingCartQuantity = String(this.productsInCartIds.length);
        } else {
          this.shoppingCartQuantity = "0";
        }

        if (this.allProducts) {
          this.productsInCart = [];
          this.allProducts.forEach((product) => {
            if (this.productsInCartIds?.includes(Number(product.id))) {
              this.productsInCart.push(product);
            }
          });
        }

        if (this.productsInCart) {
          this.productsInCart.forEach((p) => {
            this.totalPrice = this.totalPrice + p.price!;
          });
        }

        this.cd.markForCheck();
      });
  }

  showDialog = () => {
    this.visible = true;
  };

  clearCart = () => {
    localStorage.setItem("cart", JSON.stringify([]));
    this.store.dispatch(clearProductsToCart({ productsInCart: null }));
    this.cd.markForCheck;
  };

  saveCart = () => {};

  receiveValue = (value: number) => {
    let productPriceSum = value;
    console.log(productPriceSum);
  };
}
