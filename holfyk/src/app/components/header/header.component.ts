import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Product } from '../../models/product';
import { Store } from '@ngrx/store';
import { selectAllProducts } from '../../store/product-store/selectors';
import { filter, takeUntil } from 'rxjs';
import { ClearObservable } from '../../abstract/clear-observers.abstract';
import { searchProducts } from '../../store/product-store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    ToolbarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends ClearObservable implements OnInit {
  public searchForm!: FormGroup;
  public sidebarVisible: boolean = false;
  public allProducts: Product[] | null | undefined;
  public searchingProducts: Product[] = [];
  private searchQuery: string | null | undefined;

  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.store
      .select(selectAllProducts)
      .pipe(
        takeUntil(this.destroy$),
        filter((products) => products !== null && products !== undefined)
      )
      .subscribe((products) => {
        this.allProducts = products;
      });

    this.searchForm = new FormGroup({
      query: new FormControl(''),
    });
  }

  onSubmit() {
    (this.searchingProducts = []),
      (this.searchQuery = this.searchForm.value.query.trim().toLowerCase());

    if (this.allProducts && this.searchQuery) {
      this.allProducts.forEach((product: Product) => {
        if (product.title!.toLowerCase().includes(this.searchQuery!)) {
          this.searchingProducts.push(product);
        }
      });
    } else {
      alert('products NOT FOUND');
    }
    this.store.dispatch(
      searchProducts({
        searchProducts: this.searchingProducts,
      })
    );

    this.router.navigate(['/search'], {
      queryParams: {
        q: this.searchForm.value.query,
      },
    });
  }
}
