import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanRessourcesDetailsComponent } from './human-ressources-details.component';

describe('HumanRessourcesDetailsComponent', () => {
  let component: HumanRessourcesDetailsComponent;
  let fixture: ComponentFixture<HumanRessourcesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumanRessourcesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanRessourcesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
