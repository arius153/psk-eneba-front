import {Component, OnInit} from '@angular/core';
import {ToolService} from '../../../../shared/services/tool.service';
import {ReservedToolResponse} from '../../../../shared/models/reserved-tool-response';
import {Router} from '@angular/router';

@Component({
  selector: 'app-currently-rented',
  templateUrl: './lending-history.component.html',
  styleUrls: ['./lending-history.component.scss']
})
export class LendingHistoryComponent implements OnInit {

  currentlyRentedTools: ReservedToolResponse[];

  constructor(
    private toolService: ToolService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.toolService.getCurrentlyRentedTools().subscribe(result => {
      this.currentlyRentedTools = result;
    });
  }

  openTool(toolId: number): void {
    this.router.navigate(['/tool/' + toolId]);
  }
}
