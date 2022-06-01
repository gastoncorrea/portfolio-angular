import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  url:String = "http://localhost:8080/";
  email = this.auth.UsuarioLogueado;

  constructor(
    private http:HttpClient,
    private auth:AuthService
  ) { }

   obtenerDatos() : Observable<any> {
     console.log("*****Educacion"+this.email);
   return this.http.get(this.url + "curriculum/persona/"+this.email);
   }

   guardarNuevaEducacion(educacion:any) : Observable<any>{
     return this.http.post(this.url + "educacion/guardar", educacion,{responseType:'text'});
   }
}
