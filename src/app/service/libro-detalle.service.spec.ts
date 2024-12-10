import { TestBed } from '@angular/core/testing';

import { LibroDetalleService } from './libro-detalle.service';

describe('LibroDetalleService', () => {
  let service: LibroDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibroDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
