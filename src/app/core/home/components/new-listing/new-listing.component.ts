import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NewListingRequest} from '../../../../shared/models/new-listing-request';
import {CategoryResponse} from '../../../../shared/models/category-response';
import {GoogleMapsStyle} from '../../../../shared/utils/google-maps-style';
import {MatDialogRef} from '@angular/material/dialog';
import {GoogleMap, MapGeocoder} from '@angular/google-maps';
import {ToolService} from '../../../../shared/services/tool.service';

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

  @ViewChild(GoogleMap, {static: false}) map: GoogleMap;


  model: NewListingRequest = new NewListingRequest();
  categories: CategoryResponse[];

  constructor(
    public dialogRef: MatDialogRef<NewListingComponent>,
    private toolService: ToolService,
    private geoCoder: MapGeocoder
  ) {
  }

  ngOnInit(): void {
    this.toolService.getCategories().subscribe(result => {
      this.categories = result;
    });

    this.initPlaces();
  }

  doSave(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    this.toolService.addTool(this.model).subscribe(result => {
      this.dialogRef.close(result);
    });
  }

  addMarker(event: google.maps.MapMouseEvent): void {
    this.markerPosition = event.latLng.toJSON();
    this.model.lat = this.markerPosition.lat;
    this.model.lng = this.markerPosition.lng;
    this.geoCoder.geocode({location: this.markerPosition})
      .subscribe(({results}) => {
        if (results && results.length > 0) {
          this.model.address = results[0].formatted_address;
        }
      });
  }

  private initPlaces(): void {
    const input = document.getElementById('pac-input') as HTMLInputElement;
    const options = {
      fields: ['formatted_address', 'geometry', 'name'],
      strictBounds: false,
      types: ['address']
    };
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      this.markerPosition = place.geometry.location.toJSON();
      this.model.lat = this.markerPosition.lat;
      this.model.lng = this.markerPosition.lng;
      this.map.panTo(this.markerPosition);
    });
  }
}
