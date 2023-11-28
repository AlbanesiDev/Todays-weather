import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherOwmAQIInterface } from '../interfaces/weather-owm-aqi.interface';
import { WeatherOwmCurrentInterface } from '../interfaces/weather-owm-current.interface';
import { WeatherOwmForecastHourlyInterface } from '../interfaces/weather-owm-hourly.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherOwmService {
  private owmApiKey = environment.owmApiKey;
  constructor(private http: HttpClient) {}
  getCurrentWeatherData(latitude: string, longitude: string, language: string): Observable<WeatherOwmCurrentInterface> {
    const owmCurrentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${this.owmApiKey}&units=metric&lang=${language}`;
    return this.http.get<WeatherOwmCurrentInterface>(owmCurrentApiUrl);
  }
  getForecastHourly(latitude: string, longitude: string, language: string): Observable<WeatherOwmForecastHourlyInterface>{
    const owmForecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${this.owmApiKey}&units=metric&lang=${language}`;
    return this.http.get<WeatherOwmForecastHourlyInterface>(owmForecastApiUrl);
  }
  getweatherOwmAirPolution(latitude: string, longitude: string): Observable<WeatherOwmAQIInterface> {
    const owmAirPolutionUrl  = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${this.owmApiKey}`;
    return this.http.get<WeatherOwmAQIInterface>(owmAirPolutionUrl);
  }
}
