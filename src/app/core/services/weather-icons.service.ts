import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherIconInterface } from '../interfaces/weather-icon.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherIconsService {
  constructor(private http: HttpClient) {}

  getWeatherIcons(): Observable<WeatherIconInterface[]> {
    const dbUrl = `/assets/database/weather-icons.json`;
    return this.http.get<WeatherIconInterface[]>(dbUrl);
  }
  getWeatherIconsStatic(): Observable<WeatherIconInterface[]> {
    const dbUrl = `/assets/database/weather-icons-static.json`;
    return this.http.get<WeatherIconInterface[]>(dbUrl);
  }
}
