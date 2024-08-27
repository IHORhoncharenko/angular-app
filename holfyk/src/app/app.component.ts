import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductCardPreviewComponent } from './components/product-card-preview/product-card-preview.component';
import { Product } from './models/product';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { HeaderComponent } from './components/header/header.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

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
  public allProducts: Product[] | null | undefined;

  constructor() {}

  ngOnInit() {}
}
