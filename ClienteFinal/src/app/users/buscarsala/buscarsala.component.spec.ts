import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarsalaComponent } from './buscarsala.component';

describe('BuscarsalaComponent', () => {
  let component: BuscarsalaComponent;
  let fixture: ComponentFixture<BuscarsalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarsalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarsalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
