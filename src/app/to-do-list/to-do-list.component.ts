import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface TodoTask {
  description: string;
  done: boolean;
}

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent {
  constructor(private router: Router) {}

  allTasks: TodoTask[] = [];
  newTask: string = '';
  search: string = '';
  filteredTasks: TodoTask[] = this.allTasks;

  homeButtonClicked() {
    this.router.navigate(['home-page']);
  }

  addTask(form: any) {
    if (this.newTask.trim() !== '') {
      this.allTasks.push({ description: this.newTask, done: false });
      this.filterTasks();
      this.newTask = '';
      form.reset();
    }
  }

  deleteTask(task: TodoTask) {
    this.allTasks = this.allTasks.filter(t => t !== task);
    this.filterTasks();
  }

  toggleDone(task: TodoTask) {
    task.done = !task.done;
    this.filterTasks();
  }

  searchTasks() {
    this.filterTasks();
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
