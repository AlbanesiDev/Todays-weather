import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuState } from '../interfaces/offcanvas-menu.interface';

@Injectable({
  providedIn: 'root',
})
export class OffcanvasConfigurationService {
  public optionSelected = new Subject<string>();
  public optionSelected$ = this.optionSelected.asObservable();

  private menuState: MenuState = {
    notification: false,
    units: false,
    theme: false,
    icons: false,
    language: false,
    about: false,
  };

  constructor(){

  }

  toggleMenuOption(option: string): void {
    this.menuState[option] = !this.menuState[option];
    this.optionSelected.next(option);
  }
  getMenuState(): MenuState {
    return { ...this.menuState };
  }


  private menuBtnState = new Subject<boolean>();
public menuBtnState$ = this.menuBtnState.asObservable();

setMenuBtnState(state: boolean): void {
  this.menuBtnState.next(state);
}

getMenuBtnState(): Observable<boolean> {
  return this.menuBtnState$;
}

}
