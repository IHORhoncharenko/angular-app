import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { load } from './store/product-store/actions';
import { ProductCardPreviewComponent } from './components/product-card-preview/product-card-preview.component';
import { Product } from './models/product';
import { selectAllProducts } from './store/product-store/selectors';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { takeUntil } from 'rxjs';
import { ClearObservable } from './abstract/clear-observers.abstract';
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
export class AppComponent extends ClearObservable {
  public allProducts: Product[] | null | undefined;
  public sidebarVisible: boolean = false;
  public isShowHomePageSection: boolean | null | undefined;

  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.store.dispatch(load());

    this.store
      .select(selectAllProducts)
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.allProducts = products;
      });

    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          this.isShowHomePageSection = true;
          this.cd.markForCheck();
        } else {
          this.isShowHomePageSection = false;
          this.cd.markForCheck();
        }
      }
    });
  }
}
