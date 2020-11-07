import { TestBed } from '@angular/core/testing';

import { CrudusuarioService } from './crudusuario.service';

describe('CrudusuarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudusuarioService = TestBed.get(CrudusuarioService);
    expect(service).toBeTruthy();
  });
});
