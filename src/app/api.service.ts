import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Task } from './task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private apiUrl = 'http://localhost:8080/todolist';

  constructor(private http: HttpClient) { }

  getData(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  postData(task: Task): Observable<Task> {    
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateData(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  deleteData(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/${id}`);
  }
}
