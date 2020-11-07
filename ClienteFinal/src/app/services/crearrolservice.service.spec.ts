import { TestBed } from '@angular/core/testing';

import { CrearrolserviceService } from './crearrolservice.service';

describe('CrearrolserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrearrolserviceService = TestBed.get(CrearrolserviceService);
    expect(service).toBeTruthy();
  });
});
