import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataUpdateService {
  private dataUpdateSubject = new Subject<void>();

  onDataUpdated$ = this.dataUpdateSubject.asObservable();

  constructor(private location: Location){}

  emitDataUpdated() {
    this.dataUpdateSubject.next();
    this.refreshPage();
  }

  private refreshPage() {
    this.location.go(this.location.path());
    window.location.reload();
  }
}
