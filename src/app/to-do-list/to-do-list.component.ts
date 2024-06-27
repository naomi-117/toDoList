import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../api.service';
import { Task } from '../task';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  allTasks: Task[] = [];
  newTask: string = '';
  search: string = '';
  filteredTasks: Task[] = [];
  task: Task;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
      this.filteredTasks = this.allTasks;
  }

  homeButtonClicked(): void {
    this.router.navigate(['home-page']);
  }

  addTask(form: any): void {
    if (this.newTask.trim() !== '') {
      this.allTasks.push({ description: this.newTask, done: false });
      this.filterTasks();
      console.warn(this.newTask);
      this.apiService.postData(this.newTask);
      this.newTask = '';
      form.reset();
    }
  }

  deleteTask(task: Task): void {
    this.allTasks = this.allTasks.filter(t => t !== task);
    this.filterTasks();
  }

  toggleDone(task: Task): void {
    task.done = !task.done;
    this.filterTasks();
  }

  searchTasks(): void {
    this.filterTasks();
  }

  private filterTasks(): void {
    if (this.search.trim() !== '') {
      this.filteredTasks = this.allTasks.filter(task =>
        task.description.toLowerCase().includes(this.search.toLowerCase())
      );
    } else {
      this.filteredTasks = this.allTasks;
    }
  }
}
