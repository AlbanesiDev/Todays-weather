import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherUnits',
})
export class WeatherUnitsPipe implements PipeTransform {
  transform(value: any, unitType: string, temmperature: number, pressure: any): unknown {
    switch (unitType) {
      case 'temperature':
        return this.convertTemperature(temmperature);
      case 'pressure':
        return this.convertPressure(pressure);
      case 'speed':
        return this.convertSpeed(value);
      case 'rainfall':
        return this.convertRainfall(value);
      default:
        return value;
    }
  }

  private convertTemperature(value: number): number {
    return (value * 9/5) + 32;
  }

  private convertPressure(value: any): unknown {
    switch (value) {
      case 'Pascal':
        return value * 100;
      case 'Bar':
        return value * 0.001;
      case 'Milibar':
        return value * 1;
      case 'Atm':
        return value * 0.000986923;
      case 'mmHg':
        return value * 0.750062;
      case 'Torr':
        return value * 0.750062;
      default:
        return value;
    }
  }

  private convertSpeed(speed: any): unknown {
    switch (speed) {
      case 'm/s':
        return speed / 3.6;
      case 'mph':
        return speed * 0.621371;
      case 'ft/s':
        return speed * 3.28084;
      case 'kt':
        return speed * 0.539957;
      default:
        return speed;
    }
  }

  private convertRainfall(value: any): unknown {
    return value * 0.0393701;
  }
}
