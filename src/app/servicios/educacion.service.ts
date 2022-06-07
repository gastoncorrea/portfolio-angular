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

   modificarEducacion(educacion:any) : Observable<any>{
    educacion.fecha_inicioEditar = new Date(educacion.fecha_inicioEditar);
    educacion.fecha_finEditar = new Date();
     console.log("EDUCACION SERVICE 1:");
     console.log(educacion.fecha_inicioEditar);
     console.log("EDUCACION SERVICE 2:");
     console.log(educacion.fecha_finEditar);
     return this.http.put(this.url + "educacion/modificar/" + 
     `${educacion.idEducacionEditar}?nombre_institucion=${educacion.nombre_institucionEditar}&logo=${educacion.logoEditar}&fecha_inicio=${educacion.fecha_inicioEditar}&fecha_fin=${educacion.fecha_finEditar}&titulo=${educacion.tituloEditar}`
     ,{});
   }

   eliminarEducacion(id:any):Observable<any>{
     return this.http.delete(this.url + "educacion/eliminar/"+id, {responseType:'text'} )
   }
}
