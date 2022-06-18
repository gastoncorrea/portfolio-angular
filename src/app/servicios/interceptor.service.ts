import { Injectable } from '@angular/core';

import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userCurrent = this.authService.UserAutenticado;
    if(userCurrent && userCurrent.token){
      req = req.clone({ 
        setHeaders:{
          Authorization: `Bearer ${userCurrent}`
        }
      })
    }
    return next.handle(req);
  }
}
