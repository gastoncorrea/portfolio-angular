import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {CurriculumComponent} from '../componentes/curriculum/curriculum.component';
import {LoginComponent} from '../componentes/login/login.component';

const routes:Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full'},
  {path:'inicio', component: LoginComponent},
  {path:'perfil', component: CurriculumComponent}
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
