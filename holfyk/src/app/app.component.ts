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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductCardPreviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(
    private store: Store,
    private services: ProductService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.store.dispatch(load());
    this.cd.markForCheck();
  }
}
