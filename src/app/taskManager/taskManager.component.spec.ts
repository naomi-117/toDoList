import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksSearchComponent } from './taskManager.component';

describe('TasksSearchComponent', () => {
  let component: TasksSearchComponent;
  let fixture: ComponentFixture<TasksSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksSearchComponent]
    });
    fixture = TestBed.createComponent(TasksSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
