import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryResponse} from '../models/category-response';
import {AppConfigService} from './app-config.service';
import {NewListingRequest} from '../models/new-listing-request';
import {ObjectUtils} from '../utils/object-utils';
import {ToolResponse} from '../models/tool-response';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor(private httpClient: HttpClient) {
  }

  getCategories(): Observable<CategoryResponse[]> {
    const url = AppConfigService.config.backUrl + '/tool/categories';
    return this.httpClient.get<CategoryResponse[]>(url);
  }

  addTool(model: NewListingRequest): Observable<number> {
    const url = AppConfigService.config.backUrl + '/tool';
    const formData = ObjectUtils.extractFormData(model, 'data', 'files');
    return this.httpClient.post<number>(url, formData);
  }

  getAllTools(): Observable<ToolResponse[]> {
    const url = AppConfigService.config.backUrl + '/tool/all';
    return this.httpClient.get<ToolResponse[]>(url);
  }
}
