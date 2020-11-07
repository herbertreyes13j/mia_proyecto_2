import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VernotasComponent } from './vernotas.component';

describe('VernotasComponent', () => {
  let component: VernotasComponent;
  let fixture: ComponentFixture<VernotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VernotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VernotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
