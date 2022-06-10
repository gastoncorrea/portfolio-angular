import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  // Url para traer datos del servidor
  url:String = "http://localhost:8080/";
  // traigo mail del usuario logueado que esta guardado en session storage
  email = JSON.parse(sessionStorage.getItem('usuario')|| '');
  //Modelo de datos Experiencia 
  
  constructor(
    private http:HttpClient,
    private auth:AuthService
  ) { }

   obtenerDatos() : Observable<any> {
     console.log("*****"+this.email);
   return this.http.get(this.url + "curriculum/persona/"+this.email);
   }

   modificarExperiencia(experiencia: any): Observable<any> {
     experiencia.fecha_inicioEditar = new Date(experiencia.fecha_inicioEditar);
     experiencia.fecha_finEditar = new Date();
    console.log('EXPERIENCIA PUT' + experiencia.fecha_inicioEditar);
    console.log(experiencia);
    return this.http.put(
      this.url +`experiencia/modificar/${experiencia.idExperienciaEditar}?nombre=${experiencia.nombreEditar}&puesto=${experiencia.puestoEditar}&logo=${experiencia.logoEditar}&fecha_inicio=${experiencia.fecha_inicioEditar}&fecha_fin=${experiencia.fecha_finEditar}&tiempo_trab=${experiencia.tiempo_trabEditar}`,
        {}
    );
  }

    agregarExperiencia(experiencia:any) : Observable<any> {
      console.log("DATOS QUE SALEN DE EXPERIENCIA:")
      console.log(experiencia);
      return this.http.post(this.url + "experiencia/guardar",experiencia,{responseType:"text"});
    }

    eliminarExperiencia(id:any) :Observable<any>{
      return this.http.delete(this.url + "experiencia/borrar/"+id,{responseType:"text"});
    }
}
