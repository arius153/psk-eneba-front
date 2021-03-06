import {Component, Input, OnInit} from '@angular/core';
import {MyListingBrief} from '../../../../shared/models/my-listing-brief';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-listings-item',
  templateUrl: './my-listings-item.component.html',
  styleUrls: ['./my-listings-item.component.scss']
})
export class MyListingsItemComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  @Input()
  outerDivClass: string;

  @Input() listing: MyListingBrief;

  listingClicked(): void {
    this.router.navigate(['/tool/' + this.listing.id]);
  }

  ngOnInit(): void {
  }

}
