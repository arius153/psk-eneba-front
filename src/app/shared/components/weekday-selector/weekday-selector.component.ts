import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


export interface Day {
  name: string;
  day: number;
  selected: boolean;
}

@Component({
  selector: 'app-weekday-selector',
  templateUrl: './weekday-selector.component.html',
  styleUrls: ['./weekday-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WeekdaySelectorComponent),
      multi: true
    }
  ]
})

export class WeekdaySelectorComponent implements ControlValueAccessor {

  @Input()
  name: string;

  selectedDays: number[] = [];

  weekDays: Day[] = [
    {name: 'component.weekdaySelector.monday', day: 0, selected: false},
    {name: 'component.weekdaySelector.tuesday', day: 1, selected: false},
    {name: 'component.weekdaySelector.wednesday', day: 2, selected: false},
    {name: 'component.weekdaySelector.thursday', day: 3, selected: false},
    {name: 'component.weekdaySelector.friday', day: 4, selected: false},
    {name: 'component.weekdaySelector.saturday', day: 5, selected: false},
    {name: 'component.weekdaySelector.sunday', day: 6, selected: false}
  ];

  propagateChange = (_: any) => {
  }

  writeValue(value: number[]): void {
    if (value) {
      this.selectedDays = value;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange(fn);
  }

  registerOnTouched(fn: any): void {
  }

  daySelected(event: MouseEvent, day: Day): void {
    day.selected = !day.selected;
    if (day.selected) {
      this.selectedDays.push(day.day);
    } else {
      const dayToRemoveIndex = this.selectedDays.findIndex(selectedDay => selectedDay === day.day);
      if (dayToRemoveIndex >= 0) {
        this.selectedDays.splice(dayToRemoveIndex, 1);
      }
    }
    this.registerOnChange(this.selectedDays);
  }

}


