import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent {
  private date: Date;
  private year: number;
  private month: number;
  // public months: string[] = [
  //   "January", "February", "March", "April", "May", "June",
  //   "July", "August", "September", "October", "November", "December"
  // ];
  public calendarDates: number[] = [];
  public activeDay: number | null = null;

  constructor() {
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
  }

  ngOnInit(): void {
    this.manipulate();
  }

  private manipulate(): void {
    const dayOne = new Date(this.year, this.month, 1).getDay();
    const lastDate = new Date(this.year, this.month + 1, 0).getDate();
    const dayEnd = new Date(this.year, this.month, lastDate).getDay();
    const monthLastDate = new Date(this.year, this.month, 0).getDate();
    const lit = [];

    // for (let i = dayOne; i > 0; i--) {
    //   lit.push(monthLastDate - i + 1);

    // }

    for (let i = 1; i <= lastDate; i++) {
      lit.push(i);
    }

    for (let i = dayEnd; i < 6; i++) {
      lit.push(i - dayEnd + 1);
    }
    // console.log(`aaaaa ${lit}`); an error with last day

    this.calendarDates = lit;
  }

  // public updateMonth(isNext: boolean): void {
  //   this.month = isNext ? this.month + 1 : this.month - 1;

  //   if (this.month < 0 || this.month > 11) {
  //     this.date = new Date(this.year, this.month, new Date().getDate());
  //     this.year = this.date.getFullYear();
  //     this.month = this.date.getMonth();
  //   } else {
  //     this.date = new Date();
  //   }

  //   this.manipulate();
  // }

  public showMessage(day: number): void {
    this.activeDay = day;
  }

  public hideMessage(day: number): void {
    if (this.activeDay === day) {
      this.activeDay = null;
    }
  }

  public isMessageVisible(day: number): boolean {
    return this.activeDay === day;
  }
}
