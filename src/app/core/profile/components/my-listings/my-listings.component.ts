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

    // Add mock data
    /*const listing1 = new MyListingBrief();
    listing1.name = 'Cement mixer';
    listing1.category = 'Heavy machinery';
    listing1.price = 55;
    listing1.pricePeriod = 1;
    listing1.status = 1;
    const listing2 = new MyListingBrief();
    listing2.name = 'Blender';
    listing2.category = 'Home appliances';
    listing2.price = 3;
    listing2.pricePeriod = 0;
    listing2.status = 2;
    const listing3 = new MyListingBrief();
    listing3.name = 'Chainsaw';
    listing3.category = 'Some category';
    listing3.price = 30;
    listing3.pricePeriod = 1;
    listing3.status = 1;
    this.listings = [listing1, listing2, listing3];*/
  }

  addNewListing(): void {
    this.matDialog.open(NewListingComponent, AppConstants.baseDialogConfig())
      .afterClosed()
      .subscribe(result => {
        if (result === true) {
        }
      });
  }
}
