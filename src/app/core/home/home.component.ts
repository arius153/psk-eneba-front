import {Component, OnInit} from '@angular/core';
import {InitialService} from '../../shared/services/initial.service';
import {AppConfigService} from '../../shared/services/app-config.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  AppConfigService = AppConfigService;

  constructor(
    private initialService: InitialService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
  }

  alertResponse(): void {
    this.initialService.getInitialMessage().subscribe(message => {
      alert(message);
    });
  }

  changeLanguage(event: any): void {
    this.translateService.use(event.target.value);
  }

}
