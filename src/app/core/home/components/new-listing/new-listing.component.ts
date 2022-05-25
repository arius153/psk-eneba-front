import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NewListingRequest} from '../../../../shared/models/new-listing-request';
import {CategoryResponse} from '../../../../shared/models/category-response';
import {GoogleMapsStyle} from '../../../../shared/utils/google-maps-style';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {GoogleMap, MapGeocoder} from '@angular/google-maps';
import {ToolService} from '../../../../shared/services/tool.service';
import {ToastrService} from 'ngx-toastr';
import {OverwriteSelectionComponent} from '../../../../shared/components/override-selection/overwrite-selection.component';

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
  editMode: boolean;

  constructor(
    public dialogRef: MatDialogRef<NewListingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toolService: ToolService,
    private geoCoder: MapGeocoder,
    private toastrService: ToastrService,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    if (this.data?.toolId) {
      this.toolService.getToolForEditing(this.data.toolId).subscribe(tool => {
        this.model = tool;
        this.markerPosition = {lat: this.model.lat, lng: this.model.lng};
        this.map.panTo(this.markerPosition);
      });
      this.editMode = true;
    }
    this.toolService.getCategories().subscribe(result => {
      this.categories = result;
    });

    this.initPlaces();
  }

  doSave(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    if (this.editMode) {
      this.model.override = false;
      this.toolService.editTool(this.model).subscribe(result => {
        this.toastrService.success('Listing updated successfully!');
        this.dialogRef.close(result);
      }, (error) => {
        if (error.status === 409) {
          this.matDialog.open(OverwriteSelectionComponent).afterClosed().subscribe(overrideResult => {
            if (overrideResult) {
              this.model.override = true;
              this.toolService.editTool(this.model).subscribe(result => {
                this.toastrService.success('Listing updated and over written successfully!');
                this.dialogRef.close(result);
              });
            }
          });
        }
      });
    } else {
      this.toolService.addTool(this.model).subscribe(result => {
        this.dialogRef.close(result);
      });
    }
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
