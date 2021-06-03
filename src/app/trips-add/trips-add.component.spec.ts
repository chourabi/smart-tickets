import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsAddComponent } from './trips-add.component';

describe('TripsAddComponent', () => {
  let component: TripsAddComponent;
  let fixture: ComponentFixture<TripsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
