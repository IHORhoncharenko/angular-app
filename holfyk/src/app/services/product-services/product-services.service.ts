import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) {}

  getAllProducts = () => {
    const url = `https://fakestoreapi.com/products`;

    if (this.cache.has(url)) {
      return of(this.cache.get(url));
    } else {
      return this.http
        .get<any>(url)
        .pipe(tap((data) => this.cache.set(url, data)));
    }
  };
}
