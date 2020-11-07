import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearexamenComponent } from './crearexamen.component';

describe('CrearexamenComponent', () => {
  let component: CrearexamenComponent;
  let fixture: ComponentFixture<CrearexamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearexamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearexamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
