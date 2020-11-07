import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirparachatComponent } from './elegirparachat.component';

describe('ElegirparachatComponent', () => {
  let component: ElegirparachatComponent;
  let fixture: ComponentFixture<ElegirparachatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElegirparachatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElegirparachatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
