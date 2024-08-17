/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductService } from './product-services.service';

describe('Service: ProductServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService],
    });
  });

  it('should ...', inject([ProductService], (service: ProductService) => {
    expect(service).toBeTruthy();
  }));
});
