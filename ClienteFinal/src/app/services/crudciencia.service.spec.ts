import { TestBed } from '@angular/core/testing';

import { CrudcienciaService } from './crudciencia.service';

describe('CrudcienciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudcienciaService = TestBed.get(CrudcienciaService);
    expect(service).toBeTruthy();
  });
});
