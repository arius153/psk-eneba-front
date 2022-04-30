import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NewListingRequest} from '../../../../shared/models/new-listing-request';
import {InitialService} from '../../../../shared/services/initial.service';

@Component({
  selector: 'app-new-listing',
  templateUrl: './new-listing.component.html',
  styleUrls: ['./new-listing.component.scss']
})
export class NewListingComponent implements OnInit {

  model: NewListingRequest = new NewListingRequest();
  categories: string[];
  imageSrc: string;

  constructor(private initialService: InitialService) {
  }

  ngOnInit(): void {
    this.initialService.getCategories().subscribe(result => {
      this.categories = result;
    });
  }

  doSave(form: NgForm): void {

  }

  // tslint:disable-next-line:typedef
  onFileChange(event) {
    console.log('CIA FILE UPLOADAS');
    console.log(event);
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;
      };

    }
  }
}
