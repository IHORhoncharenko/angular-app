import { Routes } from '@angular/router';
import { ProductResolver } from './resolvers/product.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.page.component').then((p) => p.HomeComponent),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search/search.page.component').then(
        (p) => p.SearchComponent
      ),
  },
  {
    path: 'product/:id',
    resolve: { data: ProductResolver },
    loadComponent: () =>
      import('./pages/product-card/product-card.page.component').then(
        (p) => p.ProductCardComponent
      ),
  },
];
