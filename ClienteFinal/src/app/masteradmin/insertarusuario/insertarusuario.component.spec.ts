import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarusuarioComponent } from './insertarusuario.component';

describe('InsertarusuarioComponent', () => {
  let component: InsertarusuarioComponent;
  let fixture: ComponentFixture<InsertarusuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertarusuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
