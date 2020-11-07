import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarcienciaComponent } from './insertarciencia.component';

describe('InsertarcienciaComponent', () => {
  let component: InsertarcienciaComponent;
  let fixture: ComponentFixture<InsertarcienciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertarcienciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarcienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
