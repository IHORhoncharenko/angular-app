import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { NgIf } from '@angular/common';
import { NgClass } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Product } from '../../models/product';
import { Store } from '@ngrx/store';
import { selectChoiceProduct } from '../../store/product-store/selectors';
import { filter, takeUntil } from 'rxjs';
import { ClearObservable } from '../../abstract/clear-observers.abstract';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
  standalone: true,
  imports: [BreadcrumbModule, NgIf, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent extends ClearObservable implements OnInit {
  public items: MenuItem[] | undefined;
  public product: Product | null | undefined;

  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.store
      .select(selectChoiceProduct)
      .pipe(
        takeUntil(this.destroy$),
        filter((product) => product !== null && product !== undefined)
      )
      .subscribe((product) => {
        this.product = product;
      });

    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(event.url);
        if (event.url.includes('/product/')) {
          this.items = [
            { icon: 'pi pi-home', route: '/' },
            { label: `${this.product?.category}`, route: '/' },
            { label: `${this.product?.title}` },
          ];
          this.cd.markForCheck();
        }
        if (event.url === '/') {
          this.items = [{ icon: 'pi pi-home', route: '/' }];
          this.cd.markForCheck();
        }
      }
    });
  }
}
