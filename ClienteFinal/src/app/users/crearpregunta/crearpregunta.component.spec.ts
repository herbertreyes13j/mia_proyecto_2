import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearpreguntaComponent } from './crearpregunta.component';

describe('CrearpreguntaComponent', () => {
  let component: CrearpreguntaComponent;
  let fixture: ComponentFixture<CrearpreguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearpreguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearpreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
