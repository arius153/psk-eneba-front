import {Component, OnInit} from '@angular/core';
import {GoogleMapsStyle} from '../../shared/utils/google-maps-style';

import {ToolResponse} from '../../shared/models/tool-response';
import {CategoryResponse} from '../../shared/models/category-response';
import {FormGroup} from '@angular/forms';
import {ToolService} from '../../shared/services/tool.service';
import {ToolsRequest} from '../../shared/models/tools-request';

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
  toolsRequest = new ToolsRequest();
  showSort: boolean;
  showFilters: boolean;

  showProfile: boolean;

  constructor(
    private toolService: ToolService
  ) {
    this.showProfile = false;
  }

  ngOnInit(): void {
    this.toolService.getTools().subscribe(data => {
      this.tools = data;
    });

    this.toolService.getCategories().subscribe(data => {
      this.categories = data;
    });
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
    this.toolService.getSortedTools(this.toolsRequest).subscribe(data => {
      this.tools = data;
    });
  }

  clickMe2(): void {
    this.showProfile = this.showProfile === false;
  }

  onCheckboxChange(event: any): void {
    if (event.target.checked) {
      this.toolsRequest.selectedCategories.push(event.target.value);
    } else {
      const index = this.toolsRequest.selectedCategories.findIndex(x => x === event.target.value);
      this.toolsRequest.selectedCategories.splice(index, 1);
    }
  }
}
