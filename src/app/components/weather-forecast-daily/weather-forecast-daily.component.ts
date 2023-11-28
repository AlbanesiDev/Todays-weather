import { Component, OnInit, LOCALE_ID} from '@angular/core';
import { CacheStorageService } from 'src/app/core/services/cache-storage.service';
import { WeatherIconsService } from 'src/app/core/services/weather-icons.service';
import { RequestSequenceService } from 'src/app/core/services/request-sequence.service';
import { WeatherIconInterface } from 'src/app/core/interfaces/weather-icon.interface';
import { Datum } from 'src/app/core/interfaces/weather-bit-daily.interface';
import { DataUpdateService } from 'src/app/core/services/data-update.service';
import { TemperatureService } from 'src/app/core/services/temperature.service';

@Component({
  selector: 'app-weather-forecast-daily',
  templateUrl: './weather-forecast-daily.component.html',
  styleUrls: ['./weather-forecast-daily.component.scss']
})
export class WeatherForecastDailyComponent implements OnInit {
  weatherForecast: Datum[] = [];
  weatherIcons: WeatherIconInterface[] = [];

  constructor(
    private dataUpdateService: DataUpdateService,
    private cacheStorageService: CacheStorageService,
    private requestSequenceService: RequestSequenceService,
    private weatherIconsService: WeatherIconsService,
    public temperatureService: TemperatureService,
  ) {}

  ngOnInit(){
    this.getForecastDaily();
    this.getWatherForecastIcons();
    this.dataUpdateService.onDataUpdated$.subscribe(() => {
      this.getForecastDaily();
    });
  }

  getForecastDaily(){
    const saveData = this.cacheStorageService.getData();
    if (saveData) {
      this.weatherForecast = saveData.weatherBitDaily.data;
    } else {
      this.requestSequenceService.getData().subscribe((data) => {
        this.cacheStorageService.saveData(data);
      });
    }
  }
  getWatherForecastIcons(){
    this.weatherIconsService.getWeatherIcons().subscribe((dataIcons) => {
      this.weatherIcons = dataIcons;
    })
  }
  getWeatherIconPath(iconId: number): string {
    const icon = this.weatherIcons.find((weatherIcon) => weatherIcon.id === iconId);
    if (icon) {
      return icon.pathImage;
    } else {
      return '/assets/icons/weather-icons-static/not-available.svg';
    }
  }
}
