import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserFull} from '../models/user-full';
import {AppConfigService} from './app-config.service';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getLoggedUser(): Observable<UserFull> {
    const url = AppConfigService.config.backUrl + '/user';
    return this.httpClient.get<UserFull>(url);
  }

  changePassword(newPassword: string): Observable<string> {
    const url = AppConfigService.config.backUrl + '/user/password';
    return this.httpClient.patch<string>(url, newPassword);
  }

  changePhoneNumber(newPhoneNumber: string): Observable<string> {
    const url = AppConfigService.config.backUrl + '/user/phone-number';
    return this.httpClient.patch<string>(url, newPhoneNumber);
  }
}
