import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let request = req.clone({
        setHeaders: {authorization: localStorage.getItem('token')}
      })

      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {

          if(err.status === 401) {
            this.router.navigate(['/']); // A un componente de no autorizado o similar
          }
          return throwError(err)
        })
      )
  }



}
