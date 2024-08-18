import { Routes } from '@angular/router';
import { ProductResolver } from './resolvers/product.resolver';

export const routes: Routes = [
  {
    path: 'product/:id',
    resolve: { data: ProductResolver },
    loadComponent: () =>
      import('./pages/product-card/product-card.page.component').then(
        (p) => p.ProductCardComponent
      ),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search/search.page.component').then(
        (p) => p.SearchComponent
      ),
  },
];
