import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ProductCardPreviewComponent } from './components/product-card-preview/product-card-preview.component';
import { Product } from './models/product';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { HeaderComponent } from './components/header/header.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { Store } from '@ngrx/store';
import {
  loadAllProducts,
  loadCategory,
  loadProduct,
  loadProductsToCart,
  loadSearchedProducts,
  loadSearchQuery,
} from './store/product-store/actions';
import { filter, takeUntil } from 'rxjs';
import { ClearObservable } from './abstract/clear-observers.abstract';
import { SortComponent } from './components/sort/sort.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductCardPreviewComponent,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    HeaderComponent,
    BreadcrumbsComponent,
    SortComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends ClearObservable {
  public isSortShow: boolean | null | undefined;
  private cart: number[] | null | undefined;

  constructor(private router: Router, private store: Store, private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.store.dispatch(loadAllProducts());

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd), // Фільтруємо події NavigationEnd
        takeUntil(this.destroy$)
      )
      .subscribe((e: NavigationEnd) => {
        if (!e.url.includes('category')) {
          this.store.dispatch(loadCategory({ selectedCategory: null }));
          this.cd.markForCheck()
          console.log(
            `%c ProductState >>> selectedCategory: null`,
            `color: red; font-weight: 700`,
            e.url
          );
        }
        if (!e.url.includes('product')) {
          this.store.dispatch(loadProduct({ selectedProduct: null }));
           this.cd.markForCheck()
          console.log(
            `%c ProductState >>> selectedProduct: null`,
            `color: red; font-weight: 700`,
            e.url
          );
        }
        if (!e.url.includes('search')) {
          this.store.dispatch(loadSearchQuery({ searchQuery: null }));
          this.store.dispatch(loadSearchedProducts({ searchedProducts: null }));
           this.cd.markForCheck()
          console.log(
            `%c ProductState >>> searchQuery: null && searchedProducts: null`,
            `color: red; font-weight: 700`,
            e.url
          );
        }
      });

    if (typeof window !== 'undefined') {
      this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (this.cart) {
        this.store.dispatch(loadProductsToCart({ productsInCart: this.cart }));
        console.log(
          `%c Product in cart >>> sku`,
          `color: green; font-weight: 700`,
          this.cart
        );
      }
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!event.url.includes('/product/')) {
          this.isSortShow = true;
        } else {
          this.isSortShow = false;
        }
      }
    });
  }
}
