import { TestBed } from '@angular/core/testing';

import { CrudcarreraService } from './crudcarrera.service';

describe('CrudcarreraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudcarreraService = TestBed.get(CrudcarreraService);
    expect(service).toBeTruthy();
  });
});
