import {Component, Inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {GoogleMapsStyle} from '../../shared/utils/google-maps-style';

import {ToolResponse} from '../../shared/models/tool-response';
import {CategoryResponse} from '../../shared/models/category-response';
import {ToolService} from '../../shared/services/tool.service';
import {ToolsRequest} from '../../shared/models/tools-request';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Router} from '@angular/router';
import {GoogleMap, MapInfoWindow, MapMarker} from '@angular/google-maps';
import {ToolMarker} from '../../shared/models/tool-marker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  options: google.maps.MapOptions = {
    center: {lat: 54.700859, lng: 25.247475},
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    styles: GoogleMapsStyle.style
  };

  @ViewChild(GoogleMap, {static: false}) map: GoogleMap;
  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;
  @ViewChildren(MapMarker) mapMarkers: QueryList<MapMarker>;

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  toolMarkers: ToolMarker[] = [];

  tools: ToolResponse[];
  categories: CategoryResponse[];
  toolsRequest = new ToolsRequest();
  showSort: boolean;
  showFilters: boolean;
  showProfile: boolean;
  zoom: number;
  infoWindowContent = '';

  constructor(
    private toolService: ToolService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.showProfile = false;
  }

  ngOnInit(): void {
    this.toolService.getTools().subscribe(data => {
      this.tools = data;
      this.initMarkers();
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

  openProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  private initMarkers(): void {
    this.toolMarkers = [];
    this.tools.forEach(tool => {
      const idx = this.toolMarkers.push(new ToolMarker(tool, {lat: tool.geoCordX, lng: tool.geoCordY})) - 1;
      tool.mapMarkerId = idx;
    });
  }

  toolClicked(tool): void {
    const marker = this.mapMarkers.toArray()[tool.mapMarkerId];
    this.openInfoWindow(tool, marker);
  }

  public openInfoWindow(tool: ToolResponse, marker: MapMarker): void {
    this.centerTool(tool);
    this.infoWindowContent =
        `<div class="info-window-container">
          <h1>${tool.name}</h1>
          <span>${tool.price}€/day</span>
          <br>
          <br>
          <div class="styled-button"><a href="/tool/${tool.id}">Details</a></div>
        </div>`;
    this.infoWindow.open(marker);
  }

  centerTool(tool): void {
    this.changeMapZoom(15.5);
    this.map.panTo({lat: tool.geoCordX, lng: (tool.geoCordY)});
  }

  changeMapZoom(e: any): any {
    this.zoom = e;
  }
}
