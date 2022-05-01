import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {NewListingRequest} from '../../../../shared/models/new-listing-request';
import {InitialService} from '../../../../shared/services/initial.service';
import {CategoryResponse} from '../../../../shared/models/category-response';

@Component({
  selector: 'app-new-listing',
  templateUrl: './new-listing.component.html',
  styleUrls: ['./new-listing.component.scss']
})
export class NewListingComponent implements OnInit {

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

}
