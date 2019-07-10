import { TestBed } from '@angular/core/testing';

import { ListProductService } from './list-product.service';

describe('ListProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListProductService = TestBed.get(ListProductService);
    expect(service).toBeTruthy();
  });
});
