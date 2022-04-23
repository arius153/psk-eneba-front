import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitialService {

  constructor(private httpClient: HttpClient) {
  }

  getInitialMessage(): Observable<string> {
    return this.httpClient.get('http://localhost:8080', {responseType: 'text'});
  }
}
