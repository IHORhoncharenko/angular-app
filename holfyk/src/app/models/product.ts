import { ProductRating } from './product-rating';

export interface Product {
  title?: string;
  category?: string;
  description?: string;
  id?: number;
  image?: string;
  price?: number;
  rating?: ProductRating;
}
