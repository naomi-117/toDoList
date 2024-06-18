import { Component } from '@angular/core';

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
}