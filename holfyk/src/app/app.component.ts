import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  loadCategory,
  loadProductsToCart,
} from './store/product-store/actions';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private cart: number[] | null | undefined;

  constructor(private router: Router, private store: Store) {}

  ngOnInit() {
    // this.router.events.subscribe((events) => {
    //   if (events instanceof NavigationEnd) {
    //     if (events.url.includes('/category')) {
    //       this.store.dispatch(
    //         loadCategory({
    //           selectedCategory: events.url.split('/').reverse()[0],
    //         })
    //       );
    //     }
    //   }
    // });

    if (typeof window !== 'undefined') {
      this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (this.cart) {
        this.store.dispatch(loadProductsToCart({ productsInCart: this.cart }));
        console.log(this.cart);
      }
    }
  }
}
