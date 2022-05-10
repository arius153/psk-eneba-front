import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
   private authenticationService: AuthenticationService,
   private router: Router
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtToken = this.authenticationService.getJwtTokenFromLocalStorage();
    if (jwtToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${jwtToken}`}
      });
    }
    return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 403) {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
      return of(error.message);
    }
    return of(error);
  }
}
