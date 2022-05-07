import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryResponse} from '../models/category-response';
import {AppConfigService} from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class InitialService {

  constructor(private httpClient: HttpClient) {
  }

  getInitialMessage(): Observable<string> {
    return this.httpClient.get('http://localhost:8080', {responseType: 'text'});
  }

  getCategories(): Observable<CategoryResponse[]> {
    const url = AppConfigService.config.backUrl + '/category/';
    return this.httpClient.get<CategoryResponse[]>(url);
  }
}
