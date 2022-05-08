import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryResponse} from '../models/category-response';
import {AppConfigService} from './app-config.service';
import {NewListingRequest} from '../models/new-listing-request';
import {ObjectUtils} from '../utils/object-utils';
import {ToolResponse} from '../models/tool-response';
import {ToolsRequest} from '../models/tools-request';
import {RatingRequest} from '../models/rating-request';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  constructor(private httpClient: HttpClient) {
  }

  getCategories(): Observable<CategoryResponse[]> {
    const url = AppConfigService.config.backUrl + '/category/';
    return this.httpClient.get<CategoryResponse[]>(url);
  }

  addTool(model: NewListingRequest): Observable<number> {
    const url = AppConfigService.config.backUrl + '/tool';
    const formData = ObjectUtils.extractFormData(model, 'data', 'files');
    return this.httpClient.post<number>(url, formData);
  }

  getTools(): Observable<ToolResponse[]> {
    const url = AppConfigService.config.backUrl + '/tool/';
    return this.httpClient.get<ToolResponse[]>(url);
  }

  getSortedTools(toolsRequest: ToolsRequest): Observable<ToolResponse[]> {
    let url = AppConfigService.config.backUrl + '/tool/all?';

    if (toolsRequest.sortBy != null) {
      url = url + 'sortBy=' + toolsRequest.sortBy + '&reversed=' + toolsRequest.sortReversed;
    }

    if (toolsRequest.minPrice > 0) {
      url = url + '&minPrice=' + toolsRequest.minPrice;
    }

    if (toolsRequest.maxPrice > 0) {
      url = url + '&maxPrice=' + toolsRequest.maxPrice;
    }

    if (toolsRequest.selectedCategories.length > 0) {
      toolsRequest.selectedCategories.forEach(category => {
        url = url + '&categories=' + category;
      });
    }
    return this.httpClient.get<ToolResponse[]>(url);
  }

  ratePerson(ratingRequest: RatingRequest): Observable<any> {
    const url = AppConfigService.config.backUrl + '/';
    return this.httpClient.post(url, ratingRequest);
  }
}
