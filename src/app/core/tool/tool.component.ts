import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ToolResponse} from 'src/app/shared/models/tool-response';
import {ToolService} from 'src/app/shared/services/tool.service';
import {GoogleMapsStyle} from 'src/app/shared/utils/google-maps-style';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolComponent implements OnInit {

  tool: ToolResponse;
  id: number;

  options: google.maps.MapOptions = {
    zoom: 12,
    center: {lat: 54.687378, lng: 25.278306},
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    styles: GoogleMapsStyle.style
  };

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPosition: google.maps.LatLngLiteral;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toolService: ToolService
  ) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;

    this.toolService.getToolDetailed(this.id).subscribe(data => {
      this.tool = data;

      console.log('labas');
      console.log(this.tool);

      this.markerPosition = {lat: this.tool.geoCordX, lng: this.tool.geoCordY};
    });
  }
}
