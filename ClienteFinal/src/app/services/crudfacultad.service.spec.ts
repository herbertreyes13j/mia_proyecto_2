import { TestBed } from '@angular/core/testing';

import { CrudfacultadService } from './crudfacultad.service';

describe('CrudfacultadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudfacultadService = TestBed.get(CrudfacultadService);
    expect(service).toBeTruthy();
  });
});
