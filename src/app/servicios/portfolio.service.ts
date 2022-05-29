import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginComponent} from '../componentes/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  url:String = "http://localhost:8080/";
  
  constructor(
    private http:HttpClient,
  ) { }

   obtenerDatos() : Observable<any> {
   return this.http.get<any>(this.url + "persona/traer");
   }
}
