import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {
  // Url para traer datos del servidor
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

   modificarExperiencia(experiencia: any): Observable<any> {
    // MODIFICAR FORMATO FECHA PARA PODER ENVIAR AL SERVIDOR
    experiencia.fecha_inicioEditar = new Date(experiencia.fecha_inicioEditar);
    experiencia.fecha_finEditar = new Date(experiencia.fecha_finEditar);
    return this.http.put(
      this.url +`experiencia/modificar/${experiencia.idExperienciaEditar}?nombre=${experiencia.nombreEditar}&puesto=${experiencia.puestoEditar}&descripcion=${experiencia.descripcionEditar}&logo=${experiencia.logoEditar}&fecha_inicio=${experiencia.fecha_inicioEditar}&fecha_fin=${experiencia.fecha_finEditar}&tiempo_trab=${experiencia.tiempo_trabEditar}`,
        {},{responseType:"json"}
    );
  }

    agregarExperiencia(experiencia:any) : Observable<any> {
      
      return this.http.post(this.url + "experiencia/guardar",experiencia,{responseType:"text"});
    }

    eliminarExperiencia(id:any) :Observable<any>{
      return this.http.delete(this.url + "experiencia/borrar/"+id,{responseType:"text"});
    }
}
