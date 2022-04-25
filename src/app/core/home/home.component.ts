import {Component, OnInit} from '@angular/core';
import {InitialService} from '../../shared/services/initial.service';
import {AppConfigService} from '../../shared/services/app-config.service';
import {AuthenticationService} from '../../shared/services/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  AppConfigService = AppConfigService;

  constructor(
    private initialService: InitialService,
    public authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
  }

  alertResponse(): void {
    this.initialService.getInitialMessage().subscribe(message => {
      alert(message);
    });
  }


}
