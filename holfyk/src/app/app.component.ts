import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { load } from './store/product-store/actions';
import { ProductService } from './services/product-services/product-services.service';
import { ProductCardPreviewComponent } from './components/product-card-preview/product-card-preview.component';
import { Product } from './models/product';
import { selectAllProducts } from './store/product-store/selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductCardPreviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public allProducts: Product[] | null | undefined;

  constructor(private store: Store, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.store.dispatch(load());

    this.store.select(selectAllProducts).subscribe((products) => {
      this.allProducts = products;
    });
    this.cd.markForCheck();
  }
}
