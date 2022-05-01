import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NewListingRequest} from '../../../../shared/models/new-listing-request';
import {InitialService} from '../../../../shared/services/initial.service';
import {CategoryResponse} from '../../../../shared/models/category-response';
import {GoogleMapsStyle} from '../../../../shared/utils/google-maps-style';

@Component({
  selector: 'app-new-listing',
  templateUrl: './new-listing.component.html',
  styleUrls: ['./new-listing.component.scss']
})
export class NewListingComponent implements OnInit {

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

  model: NewListingRequest = new NewListingRequest();
  categories: CategoryResponse[];

  constructor(private initialService: InitialService) {
  }

  ngOnInit(): void {
    this.initialService.getCategories().subscribe(result => {
      this.categories = result;
    });
  }

  doSave(form: NgForm): void {
    console.log(this.model);
  }

  addMarker(event: google.maps.MapMouseEvent): void {
    this.markerPosition = event.latLng.toJSON();
    this.model.lat = this.markerPosition.lat;
    this.model.lng = this.markerPosition.lng;
  }

}
