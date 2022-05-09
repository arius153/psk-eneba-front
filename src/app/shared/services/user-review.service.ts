import {AppConfigService} from './app-config.service';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserReviewsResponse} from '../models/user-reviews-response';
import {RatingRequest} from '../models/rating-request';

@Injectable({
  providedIn: 'root'
})

export class UserReviewService {

  constructor(private httpClient: HttpClient) {
  }

  getUserReviews(): Observable<UserReviewsResponse[]> {
    const url = AppConfigService.config.backUrl + `/user-reviews`;
    return this.httpClient.get<UserReviewsResponse[]>(url);
  }

  rateUser(ratingRequest: RatingRequest): Observable<any> {
    const url = AppConfigService.config.backUrl + '/user-reviews/rate';
    return this.httpClient.post(url, ratingRequest);
  }
}
