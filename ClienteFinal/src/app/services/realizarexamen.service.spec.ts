import { TestBed } from '@angular/core/testing';

import { RealizarexamenService } from './realizarexamen.service';

describe('RealizarexamenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RealizarexamenService = TestBed.get(RealizarexamenService);
    expect(service).toBeTruthy();
  });
});
