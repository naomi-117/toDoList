import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPriorityDeadlineComponent } from './add-priority-deadline.component';

describe('AddPriorityDeadlineComponent', () => {
  let component: AddPriorityDeadlineComponent;
  let fixture: ComponentFixture<AddPriorityDeadlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPriorityDeadlineComponent]
    });
    fixture = TestBed.createComponent(AddPriorityDeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
