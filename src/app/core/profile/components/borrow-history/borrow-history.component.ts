import {Component, OnInit} from '@angular/core';
import {ToolService} from 'src/app/shared/services/tool.service';
import {BorrowLogEntryResponse} from 'src/app/shared/models/borrow-log-entry-response.module';
import {MatDialog} from '@angular/material/dialog';
import {RatingComponent} from 'src/app/core/home/components/rating/rating.component';

@Component({
  selector: 'app-borrow-history',
  templateUrl: './borrow-history.component.html',
  styleUrls: ['./borrow-history.component.scss']
})
export class BorrowHistoryComponent implements OnInit {

  history: BorrowLogEntryResponse[];

  constructor(
    private toolService: ToolService,
    private myDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.toolService.getBorrowHistory().subscribe(data => {
      this.history = data;
    });
  }

  doRate(userId, toolId): void {
    this.myDialog.open(RatingComponent,
      {
        data: {
          userToRateId: userId,
          toolToRateId: toolId
        }
      }
    );
  }

}
