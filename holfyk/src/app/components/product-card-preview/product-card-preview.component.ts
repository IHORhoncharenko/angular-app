import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Product } from '../../models/product';
import { Store } from '@ngrx/store';
import { selectAllProducts } from '../../store/product-store/selectors';
import { filter } from 'rxjs';

@Component({
  selector: 'app-product-card-preview',
  templateUrl: './product-card-preview.component.html',
  styleUrls: ['./product-card-preview.component.css'],
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardPreviewComponent implements OnInit {
  @Input()
  productData: Product | undefined | null;

  public allProducts: Product[] | undefined | null;

  constructor(private store: Store, private cd: ChangeDetectorRef) {}

  ngOnInit() {}
}
