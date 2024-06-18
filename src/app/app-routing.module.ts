import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: 'to-do-list', component: ToDoListComponent },
  { path: 'home-page', component: HomePageComponent},
  { path: '', redirectTo: '/home-page', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
