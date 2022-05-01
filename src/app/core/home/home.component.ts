import {Component, OnInit} from '@angular/core';
import {GoogleMapsStyle} from '../../shared/utils/google-maps-style';
import {MatDialog} from '@angular/material/dialog';
import {NewListingComponent} from './components/new-listing/new-listing.component';
import {AppConstants} from '../../shared/constants/app-constants';
import {Observable} from 'rxjs';
import {ToolResponse} from '../../shared/models/tool-response';
import {AppConfigService} from '../../shared/services/app-config.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  options: google.maps.MapOptions = {
    zoom: 12,
    center: {lat: 54.700859, lng: 25.247475},
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    styles: GoogleMapsStyle.style
  };

  tools: ToolResponse[];

  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.getCategories().subscribe(data => {
      console.log(data);
      this.tools = data;
    });
  }

  clickMe(): void {
    this.matDialog.open(NewListingComponent, AppConstants.baseDialogConfig());
  }

  getCategories(): Observable<ToolResponse[]> {
    const url = AppConfigService.config.backUrl + '/tool/all';
    return this.httpClient.get<ToolResponse[]>(url);
  }
}
