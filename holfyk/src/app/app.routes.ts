import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./pages/product-card/product-card.component').then(
        (p) => p.ProductCardComponent
      ),
  },
];
