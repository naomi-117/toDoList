import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'http://localhost:8080/todolist'; // !!!

  constructor(private http: HttpClient) { }

  getData(description: string): Observable<any> {
    // console.warn('im here', description);
    return this.http.get<any>(`${this.apiUrl}/todolist/${description}`);
  }
 
  postData(task: Task): void {    
    this.http.post<any>(`${this.apiUrl}/todolist`, task).subscribe(data => {
      console.warn(data);
    });
  }
}
