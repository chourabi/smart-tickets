import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculesAddComponent } from './vehicules-add.component';

describe('VehiculesAddComponent', () => {
  let component: VehiculesAddComponent;
  let fixture: ComponentFixture<VehiculesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
