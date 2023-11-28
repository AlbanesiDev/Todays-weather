import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SunriseSunsetInterface } from '../interfaces/weather-sunrise-sunset.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherSunriseSunsetService {
  private ApiUrlWeatherSunriseSunset = environment.weatherSunriseSunset;
  constructor(private http: HttpClient) {}
  getSunriseSunset(latitud: string, longitude: string): Observable<SunriseSunsetInterface> {
    const apiUrl = this.ApiUrlWeatherSunriseSunset
      .replace('{latitud}', latitud)
      .replace('{longitude}', longitude);
    return this.http.get<SunriseSunsetInterface>(apiUrl);
  }
}
