import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Task } from "../task";
import { ApiService } from "../api.service";

export enum TaskPriority {
  Lowest = 0,
  Low = 1,
  Medium = 2,
  High = 3,
  Highest = 4
}

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})

export class ToDoListComponent implements OnInit {
  task: Task = { description: '', done: false, priority: TaskPriority.Lowest, deadline: undefined };
  editing: boolean = false;
  tasks: Task[];

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.reloadTasks();
  }

  homeButtonClicked(): void {
    this.router.navigate(['home-page']);
  }

  reloadTasks() {
    this.apiService.getTask().subscribe({
      next: (tasks) => {
        this.tasks = tasks || [];
      }
    });
  }
}