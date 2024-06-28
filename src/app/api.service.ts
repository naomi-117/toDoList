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

  // getData(description: string): Observable<any> {
  //   // console.warn('im here', description);
  //   return this.http.get<any>(`${this.apiUrl}/todolist/${description}`);
  // }
 
  // getData(taskId: string): Observable<Task> {
  //   return this.http.get<Task>(`${this.apiUrl}/${taskId}`);
  // }

  postData(task: Task): Observable<Task> {    
    return this.http.post<Task>(this.apiUrl, task);
    // console.warn(task);
  }
}
