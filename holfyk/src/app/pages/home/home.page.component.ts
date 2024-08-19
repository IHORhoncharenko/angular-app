import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllProducts } from '../../store/product-store/selectors';
import { Product } from '../../models/product';
import { takeUntil } from 'rxjs';
import { ClearObservable } from '../../abstract/clear-observers.abstract';
import { ProductCardPreviewComponent } from '../../components/product-card-preview/product-card-preview.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.css'],
  standalone: true,
  imports: [ProductCardPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends ClearObservable implements OnInit {
  public allProducts: Product[] | null | undefined;

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    this.store
      .select(selectAllProducts)
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.allProducts = products;
      });
  }
}
