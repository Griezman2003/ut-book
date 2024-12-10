import { TestBed } from '@angular/core/testing';

import { LibroAgregarService } from './libro-agregar.service';

describe('LibroAgregarService', () => {
  let service: LibroAgregarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibroAgregarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
