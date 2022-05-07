import {Component, OnInit, ViewChild} from '@angular/core';
import {IgxToggleDirective} from 'igniteui-angular';
import {GoogleMapsStyle} from '../../shared/utils/google-maps-style';
import {MatDialog} from '@angular/material/dialog';
import {NewListingComponent} from './components/new-listing/new-listing.component';
import {AppConstants} from '../../shared/constants/app-constants';
import {Observable} from 'rxjs';
import {ToolResponse} from '../../shared/models/tool-response';
import {AppConfigService} from '../../shared/services/app-config.service';
import {HttpClient} from '@angular/common/http';
import {CategoryResponse} from '../../shared/models/category-response';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

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

  form: FormGroup;

  tools: ToolResponse[];
  categories: CategoryResponse[];

  public showSort: boolean;
  public showFilters: boolean;

  public sortBy: string;
  public sortReversed = false;

  public minPrice: number;
  public maxPrice: number;

  public selectedCategories: Array<number> = [];


  constructor(
    private matDialog: MatDialog,
    private httpClient: HttpClient,
  ) {
  }

  ngOnInit(): void {
    this.getTools().subscribe(data => {
      this.tools = data;
    });

    this.getCategories().subscribe(data => {
      console.log(data);
      this.categories = data;
    });
  }

  clickMe(): void {
    this.matDialog.open(NewListingComponent, AppConstants.baseDialogConfig());
  }

  getTools(): Observable<ToolResponse[]> {
    const url = AppConfigService.config.backUrl + '/tool/';
    return this.httpClient.get<ToolResponse[]>(url);
  }

  getCategories(): Observable<CategoryResponse[]> {
    const url = AppConfigService.config.backUrl + '/category/';
    return this.httpClient.get<CategoryResponse[]>(url);
  }

  getSortedTools(): Observable<ToolResponse[]> {
    let url = AppConfigService.config.backUrl + '/tool/all?';

    if (this.sortBy != null) {
      url = url + 'sortBy=' + this.sortBy + '&reversed=' + this.sortReversed;
    }

    if (this.minPrice > 0) {
      url = url + '&minPrice=' + this.minPrice;
    }

    if (this.maxPrice > 0) {
      url = url + '&maxPrice=' + this.maxPrice;
    }

    if (this.selectedCategories.length > 0) {
      this.selectedCategories.forEach(category => {
        console.log(category);
        url = url + '&categories=' + category;
      });
    }

    return this.httpClient.get<ToolResponse[]>(url);
  }

  toggleFilters(): void {
    this.showSort = false;
    this.showFilters = !this.showFilters;
  }

  toggleSort(): void {
    this.showFilters = false;
    this.showSort = !this.showSort;
  }

  submitSort(): void {
    this.getSortedTools().subscribe(data => {
      this.tools = data;
    });
  }

  onCheckboxChange(event: any): void {
    if (event.target.checked) {
      this.selectedCategories.push(event.target.value);
    } else {
      const index = this.selectedCategories.findIndex(x => x === event.target.value);

      this.selectedCategories.splice(index, 1);
    }
  }
}
