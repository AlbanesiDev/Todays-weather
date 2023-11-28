import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherUnitsService {
  rainfall: string[] = ['mm', 'in'];
  temperature: string[] = ['C', 'F'];
  pressure: string[] = ['hPa', 'Pa', 'Bar', 'mBar', 'atm', 'mmHg', 'Torr'];
  speed: string[] = ['kph', 'mph', 'km/h', 'm/s', 'Beaufort', 'knots'];

  constructor() {

  }
}
