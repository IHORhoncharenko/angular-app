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
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-card-preview',
  templateUrl: './product-card-preview.component.html',
  styleUrls: ['./product-card-preview.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RatingModule,
    CardModule,
    ButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardPreviewComponent implements OnInit {
  @Input()
  productData: Product | undefined | null;

  public allProducts: Product[] | undefined | null;
  public ratingGroup!: FormGroup;

  constructor(private store: Store, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.ratingGroup = new FormGroup({
      value: new FormControl(
        Math.round(Number(this.productData?.rating?.rate))
      ),
    });
  }
}
