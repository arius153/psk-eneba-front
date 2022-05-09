import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewListingComponent} from '../../../home/components/new-listing/new-listing.component';
import {AppConstants} from '../../../../shared/constants/app-constants';

@Component({
  selector: 'app-my-listings',
  templateUrl: './my-listings.component.html',
  styleUrls: ['./my-listings.component.scss']
})
export class MyListingsComponent implements OnInit {

  constructor(
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  openNewListingModal(): void {
    this.matDialog.open(NewListingComponent, AppConstants.baseDialogConfig());
  }
}
