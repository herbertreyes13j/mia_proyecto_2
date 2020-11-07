import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearsalaComponent } from './crearsala.component';

describe('CrearsalaComponent', () => {
  let component: CrearsalaComponent;
  let fixture: ComponentFixture<CrearsalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearsalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearsalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
