import {Component, Input, OnInit} from '@angular/core';
import {MyListingBrief} from '../../../../shared/models/my-listing-brief';

@Component({
  selector: 'app-my-listings-item',
  templateUrl: './my-listings-item.component.html',
  styleUrls: ['./my-listings-item.component.scss']
})
export class MyListingsItemComponent implements OnInit {

  constructor() { }

  @Input()
  outerDivClass: string;

  @Input() listing: MyListingBrief;

  ngOnInit(): void {
  }

}
