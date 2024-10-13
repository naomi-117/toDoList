import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from '../api.service';
import { Task } from '../task';
import { TaskPriority } from '../to-do-list/to-do-list.component';

@Component({
  selector: 'app-taskDefinition',
  templateUrl: './taskDefinition.component.html',
  styleUrls: ['./taskDefinition.component.css']
})

export class TaskDefinitionComponent implements OnInit {
  task: Task = { description: '', done: false, priority: TaskPriority.Lowest, deadline: undefined };
  selected: TaskPriority = TaskPriority.Lowest;
  selectedTask: Task | null = null;
  editing: boolean = false;
  // editTask: Task | null = null;
  checkboxDeadline: boolean = false;
  public TaskPriority = TaskPriority;

  @Input() selectedPriority: TaskPriority | null = null;
  @Input() deadline: Date | null = null;
  @Input() tasks: Task[] = [];
  @Input() editTask: Task | null = null;

  @Output() prioritySelected = new EventEmitter<TaskPriority>();
  @Output() deadlineSet = new EventEmitter<Date | null>();
  @Output() taskAdded = new EventEmitter<Task>();
  @Output() taskUpdated = new EventEmitter<Task>();

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.selected = this.task.priority;
  }

  onTaskAdded(task: Task) {
    this.taskAdded.emit(task);
  }

  setPriority(priority: TaskPriority): void {
    this.selected = priority;
    if (this.selectedTask) {
      this.selectedTask.priority = priority;
      this.apiService.putTask(this.selectedTask).subscribe({
        next: updatedTask => {
          const index = this.tasks.findIndex(t => t.id === updatedTask.id); 
          if (index !== -1) {
            this.tasks[index] = updatedTask;
            this.prioritySelected.emit(priority);
          }
          this.editing = false;
        }
      });
    } else {
      this.task.priority = priority;
    }
  }

  combineClasses(task: Task): { [key: string]: boolean } {
    return {
      'done': task.done,
      'priority-highest': task.priority === TaskPriority.Highest,
      'priority-high': task.priority === TaskPriority.High,
      'priority-medium': task.priority === TaskPriority.Medium,
      'priority-low': task.priority === TaskPriority.Low,
      'priority-lowest': task.priority === TaskPriority.Lowest
    }
  }

  withDeadline(): void {
    this.task.deadline = this.checkboxDeadline ? new Date() : undefined;
    this.deadlineSet.emit(this.task.deadline);
  }

  addTask(form: NgForm): void {
    if (this.task.description === '') {
      return;
    } else {
      this.apiService.postTask(this.task).subscribe({
        next: () => {
          this.taskAdded.emit(this.task);
          this.resetTask(form);
          this.TaskPriority.Lowest;
        },
      });
    }
    return;
  }

  resetTask(form: NgForm): void {
    this.task = { description: '', done: false, priority: this.selected, deadline: undefined};
    this.editing = false;
    form.reset({ priority: TaskPriority.Lowest });
  }
}