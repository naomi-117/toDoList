import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { DatePipe } from "@angular/common";

import { ApiService } from "../api.service";
import { Task } from "../task";

enum TaskPriority {
  Highest = '1',
  High = '2',
  Medium = '3',
  Low = '4',
  Lowest = '5'
}

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})

export class ToDoListComponent implements OnInit {
  allTasks: Task[] = [];
  search: string = '';
  filteredTasks: Task[] = [];
  task: Task = { description: '', done: false, priority: TaskPriority.Lowest, deadline: '', editing: false };
  selected: TaskPriority = TaskPriority.Lowest;
  selectedTask: Task | null = null;
  checkboxDeadline: boolean = false;
  public TaskPriority = TaskPriority;

  constructor(
    private router: Router,
    private apiService: ApiService,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
      this.showTasks();
  }

  // Public methods
  homeButtonClicked(): void {
    this.router.navigate(['home-page']);
  }

  addTask(form: NgForm) {
    if (this.task.description === '') {
      console.warn("Error: Description field is empty");
      return;
    }
    
    if (this.task.editing) {
      this.apiService.updateData(this.task).subscribe({
        next: (updatedTask) => {
          this.resetTask(form);
          this.showTasks();
        }
      });
    } else {
      this.apiService.postData(this.task).subscribe({
        next: (newTask) => {
          this.resetTask(form);
          this.showTasks();
        }
      });
    }
    return;
  }

  selectTask(task: Task): void {
    console.warn(' selectedTask', task);
    this.selectedTask = task;
    this.selected = TaskPriority.Lowest;
  }

  setPriority(priority: TaskPriority): void {
    this.selected = priority;
    if (this.selectedTask) {
      this.apiService.updateData(this.selectedTask).subscribe({
        next: updatedTask => {
          const index = this.allTasks.findIndex(t => t.id === updatedTask.id); 
          if (index !== -1) {
            this.allTasks[index] = updatedTask;
            this.sortTasks();
            this.filterTasks();
          }
        }
      });
    } else {
      this.task.priority = priority;
    }
  }

  showTasks(): void {
    this.apiService.getData().subscribe({
      next: tasks => {
        this.allTasks = tasks;
        this.sortTasks();
        this.filterTasks();
      }
    });
  }

  searchTasks(): void {
    this.filterTasks();
  }

  toggleDone(task: Task): void {
    task.done = !task.done;
    this.apiService.updateData(task).subscribe({
      next: updatedTask => {
        const index = this.allTasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          this.allTasks[index] = updatedTask;
        }
      }
    });
  }

  deleteTask(task: Task): void {
    if (task.id) {
      this.apiService.deleteData(task.id).subscribe({
        next: () => {
          this.showTasks();        
        }
      })
    }
  }

  editTask(task: Task): void {
    if (task.id) {
      this.apiService.updateData(task).subscribe({
        next: () => {
          this.task = {...task};
          this.task.editing = true;
          this.selected = task.priority as TaskPriority;
        }
      })
    } else {
      console.warn("Fehler beim bearbeiten");
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
    };
  }

  withDeadline(): void {
    if (!this.checkboxDeadline) {
      this.task.deadline = '';
    }
  }

  getPriorityTitle(priority: TaskPriority): string {
    switch (priority) {
      case TaskPriority.Highest:
        return 'Highest';
      case TaskPriority.High:
        return 'High';
      case TaskPriority.Medium:
        return 'Medium';
      case TaskPriority.Low:
        return 'Low';
      case TaskPriority.Lowest:
        return 'Lowest';
      default:
        return '';
    }
  }

  // Private methods
  private resetTask(form: NgForm): void {
    this.task = { description: '', done: false, priority: TaskPriority.Lowest, deadline: '', editing: false };
    form.resetForm();
    this.selected = TaskPriority.Lowest;
  }

  private sortTasks(): void {
    this.allTasks.sort((a, b) => {
      //Erst nach dem Erledigungsstatus sortieren
      if (a.done !== b.done) {
        return a.done ? 1 : -1;
      }

      //Wenn der Erledigungsstatus gleich ist, nach Priorität
      if (a.priority !== b.priority) {
        return a.priority > b.priority ? 1 : -1;
      }

      //Wenn die Priorität gleich ist, nach Deadline sortieren
      if (a.deadline && b.deadline) {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }

      //Falls alles gleich ist, bleibt die Reihenfolge gleich
      return 0;
    });
  }

  private filterTasks() {
    if (this.search.trim() !== '') {
      this.filteredTasks = this.allTasks.filter(task =>
      task.description.toLowerCase().includes(this.search.toLowerCase())
      );
    } else {
      this.filteredTasks = this.allTasks;
    }
  }
}