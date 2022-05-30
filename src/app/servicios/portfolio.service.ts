import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  // Variables que contienen el valor nuevo para modificar personalizado
  imagen_perfil: String = '';
  descripcion_mi: String = '';
  url_linkedin: String = '';
  nombre: String = '';
  apellido: String = '';
  num_celular: Number = 0;

  url: String = 'http://localhost:8080/';
  email = this.auth.UsuarioLogueado;
  constructor(private http: HttpClient, private auth: AuthService) {}

  obtenerDatos(): Observable<any> {
    console.log('*****' + this.email);
    return this.http.get(this.url + 'curriculum/persona/' + this.email);
  }

  modificarPersona(persona: any, id: number): Observable<any> {
    console.log('NOMBRE' + persona.nombreEditar);
    return this.http.put(
      this.url +
        `persona/modificar/${id}?imagen_perfil=${persona.imagen_perfilEditar}&descripcion_mi=${null}&url_linkedin=${persona.url_linkedinEditar}&nombre=${persona.nombreEditar}&apellido=${persona.apellidoEditar}&num_celular=${persona.num_celularEditar}`,
        {}
    );

    //   this.imagen_perfil = persona.value.imagen_perfil;
    //   this.descripcion_mi = persona.value.descripcion_mi;
    //   this.url_linkedin = persona.value.url_linkedin;
    //   this.nombre = persona.value.nombre;
    //   this.apellido = persona.value.apellido;
    //   this.num_celular = persona.value.num_celuar;
    //   return this.http.put(this.url + "persona/modificar/2?"+"imagen_perfil="+this.imagen_perfil
    //   +"descripcion_mi="+this.descripcion_mi+"url_linkedin="+this.url_linkedin+"nombre="+this.nombre+"apellido="+this.apellido+"num_celular="
    //  +this.num_celular,{});
  }
}
