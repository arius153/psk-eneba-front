import {Component, OnInit, ViewChild} from '@angular/core';
import {GoogleMapsStyle} from '../../shared/utils/google-maps-style';
import {ToolResponse} from '../../shared/models/tool-response';
import {ToolService} from '../../shared/services/tool.service';
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
  tools: ToolResponse[];

  constructor(
    private toolService: ToolService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.toolService.getAllTools().subscribe(data => {
      this.tools = data;
      this.initMarkers();
    });
  }

  mapClick($event: google.maps.MapMouseEvent | google.maps.IconMouseEvent): void {
    console.log($event.latLng.toJSON());
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
