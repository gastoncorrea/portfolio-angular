import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //api = "curriculum/persona";
  api = "http://localhost:8080/curriculum/persona";
  currentUserSubject : BehaviorSubject<any>;
  token: any;

  constructor(private http: HttpClient, private router: Router) {
    console.log("El servicio de autenticacion esta corriendo");
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')|| '{}'));
   }

  login(credenciales:any):Observable<any>{
    
      return this.http.post(this.api, credenciales,{responseType:'text'}).pipe(map(data=>{
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        console.log("DATA:" + data);
        return data;
      }))
  }

  //cerrar sesion borro token del localstorage
  logOut(){
    localStorage.removeItem('auth_token');
  }

  //consultar si hay alguna sesion iniciada
  public get logIn(): boolean{
    return (localStorage.getItem('auth_token') !== null);
  }
}
