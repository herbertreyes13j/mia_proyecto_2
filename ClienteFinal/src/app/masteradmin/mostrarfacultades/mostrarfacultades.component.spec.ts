import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarfacultadesComponent } from './mostrarfacultades.component';

describe('MostrarfacultadesComponent', () => {
  let component: MostrarfacultadesComponent;
  let fixture: ComponentFixture<MostrarfacultadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarfacultadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarfacultadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
