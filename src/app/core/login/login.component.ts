import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {JwtRequest} from '../../shared/models/jwt-request';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {FormUtils} from '../../shared/utils/form-utils';
import {Router} from '@angular/router';
import {UserRegistrationRequest} from '../../shared/models/user-registration-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel = new JwtRequest();
  registrationModel = new UserRegistrationRequest();

  registration: boolean;

  constructor(
    private translateService: TranslateService,
    private authenticationService: AuthenticationService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  changeLanguage(event: any): void {
    this.translateService.use(event.target.value);
  }


  doLogin(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    this.authenticationService.login(this.loginModel).subscribe(result => {
      this.authenticationService.setJwtToken(result.jwtToken);
      this.router.navigate(['/']);
    }, () => {
      FormUtils.handleFormErrors(form, 'password', 'noAccount');
    });
  }

  doRegister(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    this.authenticationService.register(this.registrationModel).subscribe(() => {
      this.registration = false;
    }, () => {
      FormUtils.handleFormErrors(form, 'registerPassword', 'couldNotRegistrate');
    });
  }

  toggleRegistration(): void {
    this.registration = !this.registration;
  }
}
