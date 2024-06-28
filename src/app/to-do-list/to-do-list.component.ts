import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../api.service';
import { Task } from '../task';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  allTasks: Task[] = [];
  search: string = '';
  filteredTasks: Task[] = [];
  task: Task = {description: '', done: false};

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

  // addTask(form: any): void {
  //     this.allTasks.push(this.task);
  //     this.filterTasks();
  //     this.apiService.postData(this.task);
  //     this.task = { description: "", done: false };
  //     form.reset();
  // }

//   addTask(form: NgForm): void {
//     if (this.task.description.trim()) {
//       this.allTasks.push(this.task);
//       this.filterTasks();
//       this.apiService.postData(this.task);
//       this.task = { description: '', done: false };
//       form.resetForm();
//   }
// }

  addTask(form: NgForm): void {
    if (this.task.description.trim()) {
      this.apiService.postData(this.task).subscribe(
      Task => {
        this.allTasks.push(this.task);
        this.filterTasks();
        this.task = { description: '', done: false };
        form.resetForm();
      }
    )};
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
