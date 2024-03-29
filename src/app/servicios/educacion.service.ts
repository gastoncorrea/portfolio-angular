import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
// URL PARA CONECTARSE A SERVIDOR
  url:String = "https://portfolio-web-ijdn.onrender.com/";
  // traigo mail del usuario logueado que esta guardado en session storage
  email = JSON.parse(sessionStorage.getItem('usuario')|| '');

  constructor(
    private http:HttpClient,
    private auth:AuthService
  ) { }

   obtenerDatos() : Observable<any> {
   return this.http.get(this.url + "curriculum/persona/"+this.email);
   }

   guardarNuevaEducacion(educacion:any) : Observable<any>{
     return this.http.post(this.url + "educacion/guardar", educacion,{responseType:'text'});
   }

   modificarEducacion(educacion:any) : Observable<any>{
    // MODIFICAR FORMATO FECHA PARA GUARDAR EN BASE DE DATOS
    educacion.fecha_inicioEditar = new Date(educacion.fecha_inicioEditar);
    educacion.fecha_finEditar = new Date(educacion.fecha_finEditar);
     return this.http.put(this.url + "educacion/modificar/" + 
     `${educacion.idEducacionEditar}?nombre_institucion=${educacion.nombre_institucionEditar}&logo=${educacion.logoEditar}&fecha_inicio=${educacion.fecha_inicioEditar}&fecha_fin=${educacion.fecha_finEditar}&titulo=${educacion.tituloEditar}`
     ,{},{responseType:'json'});
   }

   eliminarEducacion(id:any):Observable<any>{
     return this.http.delete(this.url + "educacion/eliminar/"+id, {responseType:'text'} )
   }
}
