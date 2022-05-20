import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryResponse} from '../models/category-response';
import {AppConfigService} from './app-config.service';
import {NewListingRequest} from '../models/new-listing-request';
import {ObjectUtils} from '../utils/object-utils';
import {ToolResponse} from '../models/tool-response';
import {ToolsRequest} from '../models/tools-request';
import {BorrowLogEntryResponse} from 'src/app/shared/models/borrow-log-entry-response.module';
import {MyListingBrief} from '../models/my-listing-brief';
import {BorrowRequest} from '../models/borrow-request';
import {ToolUnavailableTimeResponse} from '../models/tool-unavailable-time-response';

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

  addTool(model: NewListingRequest): Observable<MyListingBrief> {
    const url = AppConfigService.config.backUrl + '/tool';
    const formData = ObjectUtils.extractFormData(model, 'data', 'files');
    return this.httpClient.post<MyListingBrief>(url, formData);
  }

  borrow(model: BorrowRequest): Observable<void> {
    const url = `${AppConfigService.config.backUrl}/tool/borrow`;
    return this.httpClient.post<void>(url, model);
  }

  getToolUnavailableTimeslots(toolId: number): Observable<ToolUnavailableTimeResponse[]> {
    const url = `${AppConfigService.config.backUrl}/tool/tool-unavailable-timeslots/${toolId}`;
    return this.httpClient.get<ToolUnavailableTimeResponse[]>(url);
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

  getToolDetailed(id: any): Observable<ToolResponse> {
    const url = AppConfigService.config.backUrl + '/tool/' + id;
    return this.httpClient.get<ToolResponse>(url);
  }

  getBorrowHistory(): Observable<BorrowLogEntryResponse[]> {
    const url = AppConfigService.config.backUrl + '/tool/history';
    return this.httpClient.get<BorrowLogEntryResponse[]>(url);
  }

  getLoggedUserTools(): Observable<MyListingBrief[]> {
    const url = AppConfigService.config.backUrl + '/tool/my';
    return this.httpClient.get<MyListingBrief[]>(url);
  }

  getToolListByUserId(userId: number): Observable<MyListingBrief[]> {
    const url = AppConfigService.config.backUrl + `/tool/user/${userId}`;
    return this.httpClient.get<MyListingBrief[]>(url);
  }
}
