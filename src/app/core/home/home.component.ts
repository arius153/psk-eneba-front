import {Component, OnInit} from '@angular/core';
import {GoogleMapsStyle} from '../../shared/utils/google-maps-style';
import {ToolResponse} from '../../shared/models/tool-response';
import {ToolService} from '../../shared/services/tool.service';

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
    private toolService: ToolService
  ) {
  }

  ngOnInit(): void {
    this.toolService.getAllTools().subscribe(data => {
      this.tools = data;
    });
  }

  mapClick($event: google.maps.MapMouseEvent | google.maps.IconMouseEvent): void {
    console.log($event.latLng.toJSON());
  }
}
