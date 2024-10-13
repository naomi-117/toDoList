import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  task: Task = { description: '', done: false, priority: TaskPriority.Lowest, deadline: undefined };
  selected: TaskPriority = TaskPriority.Lowest;
  selectedTask: Task | null = null;
  editing: boolean = false;
  editTask: Task | null = null;
  taskPriority = TaskPriority;
  form: NgForm;

  @Input() description: string = '';
  @Input() tasks: Task[] = [];

  @Output() taskDone = new EventEmitter<void>();
  @Output() taskPriorityChanged = new EventEmitter<Task>();
  @Output() taskAdded = new EventEmitter<Task>();
  @Output() taskUpdated = new EventEmitter<Task>();

  taskPriorityMapping: Record<string, number> = {
    'Lowest': 0,
    'Low': 1,
    'Medium': 2,
    'High': 3,
    'Highest': 4
  }

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchTasks();
    this.sortTasks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks']) {
      this.filterTasks();
      this.sortTasks();
    }
  }

  onTaskAdded(task: Task) {
    this.tasks.push(task);
    this.sortTasks();
    this.taskAdded.emit(task);
  }

  onTaskUpdated(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.sortTasks();
    }
  }

  fetchTasks():void {
    this.apiService.getTask().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        this.filterTasks();
        this.sortTasks();
      }
    });
  }

  toggleDone(task: Task): void {
    task.done = !task.done;
    this.apiService.putTask(task).subscribe({
      next: updatedTask => {
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
          this.filterTasks();
          this.sortTasks();
          this.taskDone.emit();
        }
      }
    });
  }

  deleteTask(task: Task): void {
    if (task.id) {
      this.apiService.deleteTask(task.id).subscribe({
        next: () => this.fetchTasks()      
      });
    }
  }

  deleteAllTasks(): void {
    if (confirm('Are you sure you want to delete all tasks?')) {
      this.apiService.deleteAllTasks().subscribe({
        next: () => this.fetchTasks()
      });
    }
  }
  
  searchTasks(): void {
    this.fetchTasks();
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

  saveTask(): void {
    if (this.editTask && this.editTask.id) {
      this.apiService.putTask(this.editTask).subscribe({
        next: (updatedTask) => {
          const index = this.tasks.findIndex(t => t.id === updatedTask.id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
          this.editing = false;
          this.editTask = null;
          this.resetTask();
        }
      });
    }
  }

   // Private methods
   private filterTasks(): void {
    if (this.search.trim() !== '') {
      this.tasks = this.tasks.filter(task =>
      task.description.toLowerCase().includes(this.search.toLowerCase()) 
      );
    }
  }

  private sortTasks(): void {
    if (!this.tasks || this.tasks.length === 0) {
      return;
    }

    this.tasks.sort((a: Task, b: Task) => {
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

      const priorityA = this.taskPriorityMapping[a.priority as unknown as keyof typeof this.taskPriorityMapping] ?? this.taskPriorityMapping['Lowest']
      const priorityB = this.taskPriorityMapping[b.priority as unknown as keyof typeof this.taskPriorityMapping] ?? this.taskPriorityMapping['Lowest']
    
      return priorityB - priorityA;
    });
  }

  private resetTask(): void {
    this.task = { description: '', done: false, priority: this.selected, deadline: undefined};
    this.editing = false;
    // form.reset({ priority: TaskPriority.Lowest });
  }
}
