import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryResponse} from '../models/category-response';

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
    return this.httpClient.get<CategoryResponse[]>('http://localhost:8080/tool/categories');
  }
}
