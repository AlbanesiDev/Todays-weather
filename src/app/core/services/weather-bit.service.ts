import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherBitCurrentInterface } from '../interfaces/weather-bit-current.interface';
import { WeatherForecastDailyInterface } from '../interfaces/weather-bit-daily.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherBitService {
  private apiKey = environment.bitApiKey;
  constructor(private http: HttpClient) {}
  getCurrentWeatherData(
    latitude: string,
    longitude: string,
    language: string
  ): Observable<WeatherBitCurrentInterface> {
    const weatherBitApiUrl = `https://api.weatherbit.io/v2.0/current?&lat=${latitude}&lon=${longitude}&key=${this.apiKey}&lang=${language}`;
    return this.http.get<WeatherBitCurrentInterface>(weatherBitApiUrl);
  }

  getForecastDaily(
    latitude: string,
    longitude: string,
    language: string
  ): Observable<WeatherForecastDailyInterface> {
    const weatherBitDailyApiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${latitude}&lon=${longitude}&key=${this.apiKey}&lang=${language}`;
    return this.http.get<WeatherForecastDailyInterface>(weatherBitDailyApiUrl);
  }
}
