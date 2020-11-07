import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarcarreraComponent } from './insertarcarrera.component';

describe('InsertarcarreraComponent', () => {
  let component: InsertarcarreraComponent;
  let fixture: ComponentFixture<InsertarcarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertarcarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarcarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
