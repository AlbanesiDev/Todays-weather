import { Injectable } from '@angular/core';
import { switchMap, mergeMap } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';
import { UserLocationService } from 'src/app/core/services/user-location.service';
import { WeatherOwmService } from 'src/app/core/services/weather-owm.service';
import { WeatherBitService } from 'src/app/core/services/weather-bit.service';
import { WeatherSunriseSunsetService } from './weather-sunrise-sunset.service';
@Injectable({
  providedIn: 'root'
})
export class RequestSequenceService {

  constructor(
    private userLocationService: UserLocationService,
    private weatherOwmService: WeatherOwmService,
    private weatherBitService: WeatherBitService,
    private weatherSunriseSunsetService: WeatherSunriseSunsetService,
  ){}

  getData(): Observable<any> {
    return this.userLocationService.getLocation().pipe(
      switchMap(locationData => {
        const latitude = locationData.latitude;
        const longitude = locationData.longitude;
        const language = locationData.languages.substring(0, 2);
        const observables = [
          this.weatherOwmService.getCurrentWeatherData(latitude, longitude, language),
          this.weatherOwmService.getweatherOwmAirPolution(latitude, longitude),
          this.weatherOwmService.getForecastHourly(latitude, longitude, language),
          this.weatherBitService.getCurrentWeatherData(latitude, longitude, language),
          this.weatherBitService.getForecastDaily(latitude, longitude, language),
          this.weatherSunriseSunsetService.getSunriseSunset(latitude, longitude),
        ];
        return forkJoin(observables).pipe(
          mergeMap(([weatherOwmCurrent, weatherOwmAirPolution, weatherOwmHourly, weatherBitCurrent,  weatherBitDaily, weatherSunriseSunset]) => {
            const combinedData = {
              weatherOwmCurrent: weatherOwmCurrent,
              weatherOwmAirPolution: weatherOwmAirPolution,
              weatherOwmHourly: weatherOwmHourly,
              weatherBitCurrent: weatherBitCurrent,
              weatherBitDaily: weatherBitDaily,
              weatherSunriseSunset: weatherSunriseSunset
            };
            return of(combinedData);
          })
        );
      })
    );
  }
}
