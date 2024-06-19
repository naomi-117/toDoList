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
  search: string = '';
  filteredItems: TodoItem[] = this.allItems;

  homeButtonClicked() {
    this.router.navigate(['home-page']);
  }

  addItem(form: any) {
    if (this.newTask.trim() !== '') {
      this.allItems.push({ description: this.newTask, done: false });
      this.filteredItems = this.allItems;
      this.newTask = '';
      form.reset();
    }
  }

  searchTasks() {
    if (this.search.trim() !== '') {
      this.filteredItems = this.allItems.filter(item =>
        item.description.toLowerCase().includes(this.search.toLowerCase()));
    } else {
      this.filteredItems = this.allItems;
    }
  }
}