import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffcanvasService {
  public isOpen$ = new Subject<boolean>();
  private isOpen = false;

  openOffcanvas(){
    this.isOpen = true;
    this.isOpen$.next(true);
  }

  closeOffcanvas() {
    this.isOpen = false;
    this.isOpen$.next(false);
  }

  isOffcanvasOpen() {
    return this.isOpen;
  }
}
