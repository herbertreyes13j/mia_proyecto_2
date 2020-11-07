import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavusersComponent } from './navusers.component';

describe('NavusersComponent', () => {
  let component: NavusersComponent;
  let fixture: ComponentFixture<NavusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
