import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
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
import { takeUntil } from "rxjs";
import { ClearObservable } from "../../abstract/clear-observers.abstract";
import { Product } from "../../models/product";
import { clearProductsToCart } from "../../store/product-store/actions";

@Component({
  selector: "app-product-prev-cart",
  templateUrl: "./product-prev-cart.component.html",
  styleUrls: ["./product-prev-cart.component.css"],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPrevCartComponent
  extends ClearObservable
  implements OnInit
{
  @Input()
  productData: Product | undefined | null;

  public totalPriceInCart!: FormGroup;
  public sumPrice: number | null | undefined;

  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit() {
    this.totalPriceInCart = new FormGroup({
      quantity: new FormControl(1, Validators.min(1)),
    });

    this.sumPrice = this.productData?.price;

    this.totalPriceInCart.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value.quantity && this.productData && this.productData.price) {
          this.sumPrice = this.productData.price * value.quantity;
        }
      });
  }

  clearProductInCart = (id: number) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart = cart.filter((p: number) => p !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    this.store.dispatch(clearProductsToCart({ productsInCart: cart }));
    this.cd.markForCheck;
  };

  removeProduct = () => {
    let currentQuantity = this.totalPriceInCart.get("quantity")?.value;
    if (currentQuantity > 1) {
      this.totalPriceInCart.setValue({ quantity: currentQuantity - 1 });
      this.cd.markForCheck();
    }
  };
  addProduct = () => {
    let currentQuantity = this.totalPriceInCart.get("quantity")?.value;
    this.totalPriceInCart.setValue({ quantity: currentQuantity + 1 });
    this.cd.markForCheck();
  };
}
