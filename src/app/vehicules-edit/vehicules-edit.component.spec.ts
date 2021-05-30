import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculesEditComponent } from './vehicules-edit.component';

describe('VehiculesEditComponent', () => {
  let component: VehiculesEditComponent;
  let fixture: ComponentFixture<VehiculesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
