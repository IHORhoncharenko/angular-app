import { Routes } from '@angular/router';
import { ProductResolver } from './resolvers/product.resolver';

export const routes: Routes = [
  {
    path: 'product/:id',
    resolve: { data: ProductResolver },
    loadComponent: () =>
      import('./pages/product-card/product-card.component').then(
        (p) => p.ProductCardComponent
      ),
  },
];
