import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
export class ProductPrevCartComponent implements OnInit {
  @Input()
  productData: Product | undefined | null;
  @Output() valueEmitter = new EventEmitter<number>();

  public totalPriceInCart!: FormGroup;
  public sumPrice: number | null | undefined;

  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.totalPriceInCart = new FormGroup({
      quantity: new FormControl(1, Validators.min(1)),
    });

    this.sumPrice = this.productData?.price;
  }

  clearProductInCart = (id: number) => {
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart = cart.filter((p: number) => p !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    this.store.dispatch(clearProductsToCart({ productsInCart: cart }));
    this.cd.markForCheck;
  };

  changeQuantity = (pPrice: number) => {
    this.sumPrice = pPrice * this.totalPriceInCart.value.quantity;
  };

  emitEvent() {
    if (this.sumPrice) {
      this.valueEmitter.emit(this.sumPrice);
    }
  }
}
