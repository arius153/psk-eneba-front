import {Component, OnInit} from '@angular/core';
import {ToolService} from 'src/app/shared/services/tool.service';
import {BorrowLogEntryResponse} from 'src/app/shared/models/borrow-log-entry-response.module';

@Component({
  selector: 'app-borrow-history',
  templateUrl: './borrow-history.component.html',
  styleUrls: ['./borrow-history.component.scss']
})
export class BorrowHistoryComponent implements OnInit {

  history: BorrowLogEntryResponse[];

  constructor(
    private toolService: ToolService
  ) {
  }

  ngOnInit(): void {
    this.toolService.getBorrowHistory().subscribe(data => {
      this.history = data;
    });
  }

}
