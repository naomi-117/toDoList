import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface TodoItem {
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

  allItems: TodoItem[] = [];
  newTask: string = '';
  searchQuery: string = ''; // Definiere searchQuery

  addItem(form: any) {
    // console.warn(form.value.description);
    if (this.newTask.trim() !== '') {
      this.allItems.push({ description: this.newTask, done: false });
      this.newTask = '';
      form.reset();
    }
  }

  homeButtonClicked() {
    this.router.navigate(['home-page']);
  }
}