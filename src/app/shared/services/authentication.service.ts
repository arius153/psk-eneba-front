import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtRequest} from '../models/jwt-request';
import {Observable} from 'rxjs';
import {JwtResponse} from '../models/jwt-response';
import {AppConfigService} from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  jwtToken: string;

  constructor(private httpClient: HttpClient) {
  }

  login(jwtRequest: JwtRequest): Observable<JwtResponse> {
    const url = AppConfigService.config.backUrl + '/auth';
    return this.httpClient.post<JwtResponse>(url, jwtRequest);
  }

  getJwtTokenFromLocalStorage(): string {
    this.jwtToken = localStorage.getItem('jwtToken');
    return this.jwtToken;
  }

  setJwtToken(jwtToken: string): void {
    localStorage.setItem('jwtToken', jwtToken);
    this.jwtToken = jwtToken;
  }

}