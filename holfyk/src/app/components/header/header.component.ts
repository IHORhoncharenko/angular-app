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
import {
  selectAllProducts,
  selectProduct,
} from '../../store/product-store/selectors';
import { filter, takeUntil } from 'rxjs';
import { ClearObservable } from '../../abstract/clear-observers.abstract';
import {
  loadCategory,
  loadSearchedProducts,
  loadSearchQuery,
} from '../../store/product-store/actions';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ValidUrlPipe } from '../../pipes/valid-url/valid-url.pipe';

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
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends ClearObservable implements OnInit {
  public searchForm!: FormGroup;
  public sidebarVisible: boolean = false;
  public allProducts: Product[] | null | undefined;
  public searchedProducts: Product[] = [];
  public allCategory: string[] = [];
  private searchQuery: string | null | undefined;

  constructor(
    private store: Store,
    private cd: ChangeDetectorRef,
    private router: Router,
    private validUrlPipe: ValidUrlPipe
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
        console.log(this.allProducts);

        if (this.allProducts) {
          this.allProducts.forEach((product) => {
            if (!this.allCategory.includes(product.category!)) {
              this.allCategory.push(product.category!);
            }
          });
        }
        this.cd.markForCheck();
      });

    this.searchForm = new FormGroup({
      query: new FormControl(''),
    });
  }

  onSubmit() {
    this.store.dispatch(
      loadSearchQuery({ searchQuery: this.searchForm.value.query })
    );

    this.searchedProducts = [];
    this.searchQuery = this.searchForm.value.query.trim().toLowerCase();
    this.cd.markForCheck();

    if (this.allProducts && this.searchQuery) {
      this.allProducts.forEach((product: Product) => {
        if (product.title!.toLowerCase().includes(this.searchQuery!)) {
          this.searchedProducts.push(product);
        }
      });
    } else {
      alert('products NOT FOUND');
    }
    this.store.dispatch(
      loadSearchedProducts({
        searchedProducts: this.searchedProducts,
      })
    );

    this.router.navigate(['/search'], {
      queryParams: {
        q: this.searchForm.value.query,
      },
    });

    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((events) => {
      if (events instanceof NavigationEnd) {
        if (!events.url.includes('/search')) {
          this.store.dispatch(loadSearchQuery({ searchQuery: null }));
          this.store.dispatch(loadSearchedProducts({ searchedProducts: null }));

          const inputElement = document.getElementById('searchInput');
          if (inputElement) {
            (inputElement as HTMLInputElement).value = '';
          }
        }
      }
    });
  }

  openCategory = (category: string) => {
    this.store.dispatch(loadCategory({ selectedCategory: category }));

    this.validUrlPipe.transform(category);

    this.router.navigateByUrl(
      `/category/${this.validUrlPipe.transform(category)}`
    );
  };
}
