import {Component, OnInit} from '@angular/core';
import {MyListingBrief} from '../../../../shared/models/my-listing-brief';
import {MatDialog} from '@angular/material/dialog';
import {NewListingComponent} from '../../../home/components/new-listing/new-listing.component';
import {AppConstants} from '../../../../shared/constants/app-constants';
import {ToolService} from '../../../../shared/services/tool.service';

@Component({
  selector: 'app-my-listings',
  templateUrl: './my-listings.component.html',
  styleUrls: ['./my-listings.component.scss']
})
export class MyListingsComponent implements OnInit {

  constructor(
    private matDialog: MatDialog,
    private toolService: ToolService
  ) { }

  listings: MyListingBrief[];

  ngOnInit(): void {
    this.toolService.getLoggedUserTools().subscribe( tools => {
      this.listings = tools;
    });
  }

  addNewListing(): void {
    this.matDialog.open(NewListingComponent, AppConstants.baseDialogConfig())
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.listings.push(result);
        }
      });
  }
}
