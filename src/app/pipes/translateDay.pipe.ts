import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateDay',
})
export class TranslateDayPipe implements PipeTransform {
  transform(value: Date | string): string {
    const date = typeof value === 'string' ? new Date(value) : value;

    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error('Invalid date format:', value);
      return '';
    }

    const daysOfWeek = [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ];

    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  }
}
