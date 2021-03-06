import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToolResponse} from 'src/app/shared/models/tool-response';
import {ToolService} from 'src/app/shared/services/tool.service';
import {GoogleMapsStyle} from 'src/app/shared/utils/google-maps-style';
import {BorrowRequest} from '../../shared/models/borrow-request';
import {ToolUnavailableTimeResponse} from '../../shared/models/tool-unavailable-time-response';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {UserInfoComponent} from '../user-info/user-info.component';
import {AppConstants} from '../../shared/constants/app-constants';
import {NewListingComponent} from '../home/components/new-listing/new-listing.component';

@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolComponent implements OnInit {

  Math = Math;

  borrowModel = new BorrowRequest();
  toolUnavailableTimeslots: ToolUnavailableTimeResponse[] = [];
  tool: ToolResponse;
  id: number;
  minDate: Date;
  maxDate: Date;
  priceCalculable = false;
  totalPrice = 0;

  options: google.maps.MapOptions = {
    zoom: 12,
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    styles: GoogleMapsStyle.style
  };

  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPosition: google.maps.LatLngLiteral;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toolService: ToolService,
    private toastr: ToastrService,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.borrowModel.toolId = this.id;
    this.toolService.getToolDetailed(this.id).subscribe(data => {
      this.options.center = {lat: data.geoCordX, lng: data.geoCordY};
      this.tool = data;
      this.tool.simplifiedUserDTO.roundedReviewAverage = Math.round(this.tool.simplifiedUserDTO.reviewAverage);
      this.markerPosition = {lat: this.tool.geoCordX, lng: this.tool.geoCordY};
    });
    this.toolService.getToolUnavailableTimeslots(this.id).subscribe(data => {
      this.toolUnavailableTimeslots = data;
    });
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.minDate.getDate() + 30);
  }

  doBorrow(): void {

    this.borrowModel.borrowedAt = new Date(this.borrowModel.borrowedAt.getFullYear(),
      this.borrowModel.borrowedAt.getMonth(),
      this.borrowModel.borrowedAt.getDate(),
      this.borrowModel.borrowedAt.getHours(),
      this.borrowModel.borrowedAt.getMinutes() - this.borrowModel.borrowedAt.getTimezoneOffset());
    this.borrowModel.returnedAt = new Date(this.borrowModel.borrowedAt.getFullYear(),
      this.borrowModel.returnedAt.getMonth(),
      this.borrowModel.returnedAt.getDate(),
      this.borrowModel.returnedAt.getHours(),
      this.borrowModel.returnedAt.getMinutes() - this.borrowModel.returnedAt.getTimezoneOffset());
    this.toolService.borrow(this.borrowModel).subscribe(() => {
      this.toastr.success('Successfully borrowed tool!');
      this.router.navigateByUrl('/');
    });
  }

  toolTimeslotFilter = (date: Date): boolean => {
    for (const timeslot of this.toolUnavailableTimeslots) {
      if (new Date(timeslot.unavailableFrom).getTime() <= date.getTime() && new Date(timeslot.unavailableTill).getTime() >= date.getTime()) {
        return false;
      }
    }

    let isOnAvailableDay = false;
    for (const day of this.tool.availableDays) {
      isOnAvailableDay = isOnAvailableDay || (day === date.getDay());
    }
    return isOnAvailableDay;
  }

  setMinMax(): void {
    this.minDate = this.borrowModel.borrowedAt;
    let nextUnavailableStart = this.maxDate;
    for (const timeslot of this.toolUnavailableTimeslots) {
      if (new Date(timeslot.unavailableFrom).getTime() > this.borrowModel.borrowedAt.getTime()) {
        if (new Date(timeslot.unavailableFrom).getTime() <= nextUnavailableStart.getTime()) {
          nextUnavailableStart = new Date(timeslot.unavailableFrom);
        }
      }
    }
    this.maxDate = nextUnavailableStart;
    this.priceCalculable = false;
  }

  resetMinMax(): void {
    if (this.borrowModel.returnedAt != null) {
      this.minDate = new Date();
      this.maxDate = new Date();
      this.maxDate.setDate(this.minDate.getDate() + 30);
      this.calculateTotalPrice();
      this.priceCalculable = true;
    } else {
      this.priceCalculable = false;
    }
  }

  openUserDialog(): void {
    const dialogConfig = AppConstants.baseDialogConfig();
    dialogConfig.data = {userId: this.tool.simplifiedUserDTO.userId};
    this.matDialog.open(UserInfoComponent, dialogConfig);
  }

  calculateTotalPrice(): void {
    const diff = Math.abs(this.borrowModel.returnedAt.getTime() - this.borrowModel.borrowedAt.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    this.totalPrice = (diffDays + 1) * this.tool.price;
  }

  editTool(): void {
    const dialogConfig = AppConstants.baseDialogConfig();
    dialogConfig.data = {toolId: this.id};
    this.matDialog.open(NewListingComponent, dialogConfig)
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.tool = result;
          this.tool.simplifiedUserDTO.roundedReviewAverage = Math.round(this.tool.simplifiedUserDTO.reviewAverage);
        }
      });
  }
}
