import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  private _isFahrenheit: boolean = false;

  constructor() {
    const storedValue = localStorage.getItem('isFahrenheit');
    if (storedValue === null) {
      this._isFahrenheit = false;
      localStorage.setItem('isFahrenheit', JSON.stringify(this._isFahrenheit));
    } else {
      this._isFahrenheit = JSON.parse(storedValue);
    }
  }

  get isFahrenheit(): boolean {
    return this._isFahrenheit;
  }

  setUnit(unit: 'celsius' | 'fahrenheit') {
    if (unit === 'fahrenheit') {
      this._isFahrenheit = true;
    } else {
      this._isFahrenheit = false;
    }
    localStorage.setItem('isFahrenheit', JSON.stringify(this._isFahrenheit));
  }
}
