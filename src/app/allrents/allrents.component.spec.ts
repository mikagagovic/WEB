import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllrentsComponent } from './allrents.component';

describe('AllrentsComponent', () => {
  let component: AllrentsComponent;
  let fixture: ComponentFixture<AllrentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllrentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllrentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
