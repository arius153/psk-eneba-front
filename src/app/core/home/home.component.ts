import {Component, OnInit, ViewChild} from '@angular/core';
import {GoogleMapsStyle} from '../../shared/utils/google-maps-style';
import {ToolResponse} from '../../shared/models/tool-response';
import {CategoryResponse} from '../../shared/models/category-response';
import {FormGroup} from '@angular/forms';
import {ToolService} from '../../shared/services/tool.service';
import {ToolsRequest} from '../../shared/models/tools-request';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Router} from '@angular/router';
import {GoogleMap} from '@angular/google-maps';

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

  @ViewChild(GoogleMap, {static: false}) map: GoogleMap;

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  form: FormGroup;

  tools: ToolResponse[];
  categories: CategoryResponse[];
  toolsRequest = new ToolsRequest();
  showSort: boolean;
  showFilters: boolean;

  constructor(
    private toolService: ToolService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
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
      this.initMarkers();
    });
  }

  onCheckboxChange(event: any): void {
    if (event.target.checked) {
      this.toolsRequest.selectedCategories.push(event.target.value);
    } else {
      const index = this.toolsRequest.selectedCategories.findIndex(x => x === event.target.value);
      this.toolsRequest.selectedCategories.splice(index, 1);
    }
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  private initMarkers(): void {
    this.tools.forEach(tool => {
      this.markerPositions.push({lat: tool.geoCordX, lng: tool.geoCordY});
    });
  }

  centerTool(tool): void {
    this.map.panTo({lat: tool.geoCordX, lng: tool.geoCordY});

  }
}
