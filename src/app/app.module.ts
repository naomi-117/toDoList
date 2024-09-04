import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './api.service';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { SearchTaskComponent } from './search-task/search-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { PriorityComponent } from './priority/priority.component';
import { DeadlineComponent } from './deadline/deadline.component';
import { AddTaskComponent } from './add-task/add-task.component';


@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    HomePageComponent,
    EditTaskComponent,
    SearchTaskComponent,
    DeleteTaskComponent,
    PriorityComponent,
    DeadlineComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ApiService, DatePipe, 
  ],
  bootstrap: [AppComponent],
})
export class AppModule { 
  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('de-DE')
  }
}
