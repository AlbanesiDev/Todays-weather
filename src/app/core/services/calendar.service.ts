import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private isOpenCalendar = false;
  isOpenCalendar$ = new Subject<boolean>();
  openCalendar() {
    this.isOpenCalendar = true;
    this.isOpenCalendar$.next(true);
  }
  closeCalendar() {
    this.isOpenCalendar = false;
    this.isOpenCalendar$.next(false);
  }
}
