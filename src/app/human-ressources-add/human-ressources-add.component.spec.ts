import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanRessourcesAddComponent } from './human-ressources-add.component';

describe('HumanRessourcesAddComponent', () => {
  let component: HumanRessourcesAddComponent;
  let fixture: ComponentFixture<HumanRessourcesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumanRessourcesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanRessourcesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
