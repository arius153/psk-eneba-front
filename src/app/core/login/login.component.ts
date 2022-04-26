import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {JwtRequest} from '../../shared/models/jwt-request';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {FormUtils} from '../../shared/utils/form-utils';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model = new JwtRequest();

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
    this.authenticationService.login(this.model).subscribe(result => {
      this.authenticationService.setJwtToken(result.jwtToken);
      this.router.navigate(['/']);
    }, () => {
      FormUtils.handleFormErrors(form, 'password', 'noAccount');
    });
  }
}
