import { TestBed } from '@angular/core/testing';

import { CrudtemaService } from './crudtema.service';

describe('CrudtemaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudtemaService = TestBed.get(CrudtemaService);
    expect(service).toBeTruthy();
  });
});
