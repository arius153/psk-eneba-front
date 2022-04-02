import { Component, OnInit } from '@angular/core';
import {InitialService} from "../../shared/services/initial.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private initialService: InitialService) { }

  ngOnInit(): void {
  }

  alertResponse(): void {
    this.initialService.getInitialMessage().subscribe(message => {
      alert(message);
    })
  }

}
