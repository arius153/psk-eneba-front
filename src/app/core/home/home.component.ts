import {Component, OnInit} from '@angular/core';
import {GoogleMapsStyle} from '../../shared/utils/google-maps-style';

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


  constructor(
  ) {
  }

  ngOnInit(): void {
  }

}
