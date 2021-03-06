import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {CurriculumComponent} from '../componentes/curriculum/curriculum.component';
import {LoginComponent} from '../componentes/login/login.component';
import { Error404Component } from '../componentes/error404/error404.component';
import {GuardGuard} from '../servicios/guard.guard';

const routes:Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path:'inicio', component: CurriculumComponent, canActivate:[GuardGuard]},
  {path:'login', component: LoginComponent},
  {path:'**',component:Error404Component},
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
