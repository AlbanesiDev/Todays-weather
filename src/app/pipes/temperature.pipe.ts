import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperaturePipe'
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number, isFahrenheit: boolean): string {
    const temperatura = isFahrenheit ? this.convertFahrenheit(value) : value;
    return temperatura.toFixed(0);
  }

  private convertFahrenheit(celsius: number): number {
    return (celsius * 9/5) + 32;
  }
}
