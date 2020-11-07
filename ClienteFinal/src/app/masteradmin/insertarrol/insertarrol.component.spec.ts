import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarrolComponent } from './insertarrol.component';

describe('InsertarrolComponent', () => {
  let component: InsertarrolComponent;
  let fixture: ComponentFixture<InsertarrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertarrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
