import {Inject, Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    @Inject(Injector) private injector: Injector
  ) {
  }

  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtToken = this.authenticationService.getJwtTokenFromLocalStorage();
    if (jwtToken) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${jwtToken}`}
      });
    }
    return next.handle(request).pipe(catchError(x => this.handleAuthError(x)));
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 403) {
      this.authenticationService.logout();
      this.toastrService.clear();
      this.toastrService.info('Your session has expired!');
      this.router.navigateByUrl('/login');

      return of(error.message);
    }
    return of(error);
  }
}
