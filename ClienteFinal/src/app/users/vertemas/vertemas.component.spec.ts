import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VertemasComponent } from './vertemas.component';

describe('VertemasComponent', () => {
  let component: VertemasComponent;
  let fixture: ComponentFixture<VertemasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VertemasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VertemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
