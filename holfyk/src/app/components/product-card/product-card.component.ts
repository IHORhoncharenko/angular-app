import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
