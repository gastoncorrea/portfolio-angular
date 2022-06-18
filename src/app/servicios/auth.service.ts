import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // URL PARA CONECTARSE CON SERVIDOR
  api = ' https://stormy-harbor-23738.herokuapp.com/';
  currentUserSubject: BehaviorSubject<any>;
  usuarioInvitado: boolean = true;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem('currentUser') || '{}')
    );
  }
  // LLAMADA AL SERVIDOR PARA LOGUEARSE COMO ADMIN
  login(credenciales: any): Observable<any> {
    // guardo email de usuario registrado para luego usar sus datos desde la api
    sessionStorage.setItem('usuario', JSON.stringify(credenciales.email));

    return this.http
      .post(this.api + 'autenticacion/persona', credenciales, {
        responseType: 'text',
      })
      .pipe(
        map((data) => {
          sessionStorage.setItem('currentUser', JSON.stringify(data));
          this.currentUserSubject.next(data);

          return data;
        })
      );
  }
  // LLAMADA AL SERVIDOR PARA LOGUEARSE COMO INVITADO
  loginInvitado(): Observable<any> {
    sessionStorage.setItem(
      'usuario',
      JSON.stringify('gastoncorrea90e@gmail.com')
    );
    return this.http
      .get(this.api + 'login/invitado', { responseType: 'text' })
      .pipe(
        map((data) => {
          sessionStorage.setItem('currentUser', JSON.stringify(data));
          this.currentUserSubject.next(data);
          return data;
        })
      );
  }

  get UserAutenticado() {
    return this.currentUserSubject.value;
  }

  get Usuario() {
    return this.usuarioInvitado;
  }
}
