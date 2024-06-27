import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';

import { Observable, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getData(description: string): Observable<any> {
    console.warn('im here', description);
    return this.http.get<any>(`${this.apiUrl}/todolist/${description}`);
  }
 
  postData(description: string): void {
    console.warn('im here', description);
    
    this.http.post<any>(`${this.apiUrl}/todolist/${description}`, description).subscribe(data => {
      console.warn(data);
    });
  }
}
