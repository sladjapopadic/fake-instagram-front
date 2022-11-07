import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {LoggedUserService} from "../logged-user/logged-user.service";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private loggedUserService: LoggedUserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers;
    if (!req.url.includes('auth')) {
      headers = req.headers
        .set('Authorization', 'Bearer ' + this.loggedUserService.getToken())
    }
    const authReq = req.clone({headers});
    return next.handle(authReq)
      .pipe(
        catchError(this.handleServerErrors)
      );
  }

  handleServerErrors(error: HttpErrorResponse) {
    if (error.status === 400) {
      return throwError(error);
      //todo
    }
    return throwError(error.error);
  }
}
