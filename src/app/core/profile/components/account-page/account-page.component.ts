import { Component, OnInit } from '@angular/core';
import {UserFull} from '../../../../shared/models/user-full';
import {UserService} from '../../../../shared/services/user.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  user: UserFull;

  // Phone number changing
  newPhoneNumber: string;
  changingNumber = false;
  showChangeNumber(): void {
    this.changingNumber = true;
    this.newPhoneNumber = '';
  }
  changeNumber(): void {
    this.changingNumber = false;
    this.userService.changePhoneNumber(this.newPhoneNumber).subscribe();
    this.ngOnInit();
  }
  cancelNumberChange(): void {
    this.changingNumber = false;
  }

  // Password changing
  newPassword: string;
  newPasswordRepeated: string;
  changingPassword = false;
  showChangePassword(): void {
    this.changingPassword = true;
    this.newPassword = '';
    this.newPasswordRepeated = '';
  }
  changePassword(): void {
    if (this.newPassword === this.newPasswordRepeated) {
      this.changingPassword = false;
      this.userService.changePassword(this.newPassword).subscribe();
      this.ngOnInit();
    }
  }
  cancelPasswordChange(): void {
    this.changingPassword = false;
  }


  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe(u => { this.user = u; });

    /*this.user = new UserFull();
    this.user.fullName = 'Bronius Barzdauskas';
    this.user.natIdNumber = '59707271234';
    this.user.email = 'meskiukas@one.lt';
    this.user.phoneNumber = '+37061234579';*/
  }

}
