import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Task } from '../task';
import { TaskPriority } from '../to-do-list/to-do-list.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-taskManager',
  templateUrl: './taskManager.component.html',
  styleUrls: ['./taskManager.component.css']
})
export class TaskManagerComponent implements OnInit, OnChanges {
  search: string = '';
  theTasks: Task[] = [];
  task: Task = { description: '', done: false, priority: TaskPriority.Lowest, deadline: undefined };
  selected: TaskPriority = TaskPriority.Lowest;
  selectedTask: Task | null = null;
  checkboxDeadline: boolean = false;
  editing: boolean = false;
  editTask: Task | null = null;
  public taskPriority = TaskPriority;

  @Input() description: string = '';
  @Input() tasks: Task[] = [];

  @Output() searchChanged = new EventEmitter<string>();
  @Output() taskDone = new EventEmitter<void>();
  @Output() taskPriorityChanged = new EventEmitter<Task>();

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks']) {
      this.filterTasks();
    }
  }

  fetchTasks():void {
    this.apiService.getTask().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        this.filterTasks();
      }
    })
  }

  toggleDone(task: Task): void {
    task.done = !task.done;
    this.apiService.putTask(task).subscribe({
      next: updatedTask => {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
          this.filterTasks();
          this.taskDone.emit();
        }
      }
    });
  }

  deleteTask(task: Task): void {
    if (task.id) {
      this.apiService.deleteTask(task.id).subscribe({
        next: () => {
          this.fetchTasks();      
        }
      });
    }
  }
  
  searchTasks(event: any): void { 
    this.filterTasks();
    this.searchChanged.emit(this.search);
  }

  editingTask(task: Task): void {
     if (task.id) {
      this.apiService.putTask(task).subscribe({
        next: (updatedTask) => {
          this.editing = true;
          this.editTask = { ...updatedTask };
        }
      });
    }
  }

  private getPriorityClass(priority: TaskPriority): string {
    switch (priority) {
      case TaskPriority.Highest: return 'priority-highest';
      case TaskPriority.High: return 'priority-high';
      case TaskPriority.Medium: return 'priority-medium';
      case TaskPriority.Low: return 'priority-low';
      case TaskPriority.Lowest: return 'priority-lowest';
      default: return '';
    }
  }
  
  combineClasses(task: Task): { [key: string]: boolean } {
    return {
      'done': task.done,
      [this.getPriorityClass(task.priority)]: true
    };
  }

  selectTask(task: Task): void {
    this.selectedTask = task;
    this.selected = TaskPriority.Lowest;
  }

   // Private methods
   private filterTasks() {
    if (this.search.trim() !== '') {
      this.theTasks = this.tasks.filter(task =>
      task.description.toLowerCase().includes(this.search.toLowerCase())      
      );
    } else {
      this.theTasks = this.tasks;
    }
    this.sortTasks();
  }

  private sortTasks(): void {
    if (!this.theTasks || this.theTasks.length === 0) {
      return;
    }
    this.theTasks.sort((a: Task, b: Task) => {
      if (a.done !== b.done) {
        return a.done ? 1 : -1;
      }

      if (a.deadline && b.deadline) {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
  
      if (a.deadline && !b.deadline) {
        return -1;
      }
      
      if (!a.deadline && b.deadline) {
        return 1;
      }

      return b.priority - a.priority;
    });
  }
}
