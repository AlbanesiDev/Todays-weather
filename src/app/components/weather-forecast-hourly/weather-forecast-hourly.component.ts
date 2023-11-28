import { Component, OnInit } from '@angular/core';
import { WeatherIconsService } from 'src/app/core/services/weather-icons.service';
import { CacheStorageService } from 'src/app/core/services/cache-storage.service';
import { RequestSequenceService } from 'src/app/core/services/request-sequence.service';
import { WeatherIconInterface } from 'src/app/core/interfaces/weather-icon.interface';
import { List } from 'src/app/core/interfaces/weather-owm-hourly.interface';
import { DataUpdateService } from 'src/app/core/services/data-update.service';
import { register } from 'swiper/element/bundle';
import { TemperatureService } from 'src/app/core/services/temperature.service';
register();

@Component({
  selector: 'app-weather-forecast-hourly',
  templateUrl: './weather-forecast-hourly.component.html',
  styleUrls: ['./weather-forecast-hourly.component.scss'],
})
export class WeatherForecastComponent implements OnInit {
  public weatherForecast: List[] = [];
  public weatherIcons: WeatherIconInterface[] = [];

  constructor(
    private dataUpdateService: DataUpdateService,
    private cacheStorageService: CacheStorageService,
    private requestSequenceService: RequestSequenceService,
    private weatherIconsService: WeatherIconsService,
    public temperatureService: TemperatureService
  ) {}

  ngOnInit() {
    this.getWeatherForecast();
    this.getWatherForecastIcons();
    this.dataUpdateService.onDataUpdated$.subscribe(() => {
      this.getWeatherForecast();
    });
  }

  getWeatherForecast() {
    const saveData = this.cacheStorageService.getData();
    if (saveData) {
      console.log(saveData);
      this.weatherForecast = saveData.weatherOwmHourly.list;
    } else {
      this.requestSequenceService.getData().subscribe((data) => {
        this.cacheStorageService.saveData(data);
      });
    }
  }

  getWatherForecastIcons() {
    this.weatherIconsService.getWeatherIcons().subscribe((dataIcons) => {
      this.weatherIcons = dataIcons;
    });
  }
  getWeatherIconPath(iconId: number, iconCode: string): string {
    if (iconCode) {
      const icon = this.weatherIcons.find((weatherIcon) => weatherIcon.icon === iconCode);
      if (icon) {
        return icon.pathImage;
      } else {
        const icon = this.weatherIcons.find((weatherIcon) => weatherIcon.id === iconId);
        if (icon) {
          return icon.pathImage;
        } else {
          return '/assets/icons/weather-icons-static/not-available.svg';
        }
      }
    } else {
      return '/assets/icons/weather-icons-static/not-available.svg';
    }
  }
}
