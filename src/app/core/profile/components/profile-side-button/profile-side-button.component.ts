import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-side-button',
  templateUrl: './profile-side-button.component.html',
  styleUrls: ['./profile-side-button.component.scss']
})
export class ProfileSideButtonComponent implements OnInit {

  constructor() { }

  highlighted: boolean;

  @Input() text: string;
  @Input() startSelected = false;

  @Output() selected: EventEmitter<any> = new EventEmitter();

  clicked(): void {
    this.select();
  }

  select(): void {
    if (this.highlighted !== true) {
      this.highlighted = true;
      this.selected.emit();
    }
  }

  deselect(): void {
    if (this.highlighted !== false) {
      this.highlighted = false;
    }
  }

  isSelected(): boolean {
    return this.highlighted;
  }

  ngOnInit(): void {
    this.highlighted = this.startSelected;
  }

}
