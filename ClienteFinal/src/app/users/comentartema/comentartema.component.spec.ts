import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentartemaComponent } from './comentartema.component';

describe('ComentartemaComponent', () => {
  let component: ComentartemaComponent;
  let fixture: ComponentFixture<ComentartemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentartemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComentartemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
