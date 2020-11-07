import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarfacultadComponent } from './insertarfacultad.component';

describe('InsertarfacultadComponent', () => {
  let component: InsertarfacultadComponent;
  let fixture: ComponentFixture<InsertarfacultadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertarfacultadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarfacultadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
