import { Component, OnInit } from '@angular/core';
import { CacheStorageService } from 'src/app/core/services/cache-storage.service';
import { WeatherIconsService } from 'src/app/core/services/weather-icons.service';
import { RequestSequenceService } from 'src/app/core/services/request-sequence.service';
import { WeatherIconInterface } from 'src/app/core/interfaces/weather-icon.interface';
import { WeatherBitCurrentData } from 'src/app/core/interfaces/weather-bit-current.interface';
import { WeatherOwmCurrentInterface } from 'src/app/core/interfaces/weather-owm-current.interface';
import { DataUpdateService } from 'src/app/core/services/data-update.service';
import { ModeToggleService } from 'src/app/theme/services/themes-toggle.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-weather-today',
  templateUrl: './weather-today.component.html',
  styleUrls: ['./weather-today.component.scss'],
})
export class WeatherTodayComponent implements OnInit {
  public weatherBitCurrent!: WeatherBitCurrentData;
  public weatherOWMCurrent!: WeatherOwmCurrentInterface;
  public weatherIcon: string = '/assets/icons/weather-icons/not-available.svg';
  public weatherIconCode!: string;
  public weatherIconId!: number;
  public currentTemp!: number;
  public uvCategory!: string;
  public uvCode!: number;
  public colorTheme!: string;
  public formattedDate!: string;
  public language = es;
  constructor(
    private dataUpdateService: DataUpdateService,
    private cacheStorageService: CacheStorageService,
    private requestSequenceService: RequestSequenceService,
    private weatherIconsService: WeatherIconsService,
    private modeToggleService: ModeToggleService
  ) {
    const currentDate = new Date();
    this.formattedDate = format(currentDate, 'EEEE d, MMMM', { locale: this.language });
  }

  ngOnInit(): void {
    this.getData();
    this.getWeatherIcon(this.weatherIconId, this.weatherIconCode);
    this.showCategoryUv();
    this.dataUpdateService.onDataUpdated$.subscribe(() => {
      this.getData();
    });
  }
  getData() {
    const saveData = this.cacheStorageService.getData();
    if (saveData) {
      this.weatherBitCurrent = saveData.weatherBitCurrent.data[0];
      this.weatherOWMCurrent = saveData.weatherOwmCurrent;
      this.weatherIconId = saveData.weatherOwmCurrent.weather[0].id;
      this.weatherIconCode = saveData.weatherOwmCurrent.weather[0].icon;
      this.currentTemp = Math.floor(saveData.weatherOwmCurrent.main.temp);
      this.uvCode = Math.floor(saveData.weatherBitCurrent.data[0].uv);
    } else {
      this.requestSequenceService.getData().subscribe((data) => {
        this.cacheStorageService.saveData(data);
      });
    }
  }
  getWeatherIcon(weatherIconId: number, weatherIconCode: string) {
    this.weatherIconsService
      .getWeatherIcons()
      .subscribe((dataIcons: WeatherIconInterface[]) => {
        if (weatherIconCode !== null) {
          const icon = dataIcons.find((icon) => icon.icon === weatherIconCode);
          if (icon) {
            this.weatherIcon = icon.pathImage;
          }
        } else {
          const icon = dataIcons.find((icon) => icon.id === weatherIconId);
          if (icon) {
            this.weatherIcon = icon.pathImage;
          }
        }
      });
  }
  showCategoryUv() {
    if (this.uvCode >= 1 && this.uvCode <= 2) {
      this.uvCategory = ' (Bajo)';
    } else if (this.uvCode >= 3 && this.uvCode <= 5) {
      this.uvCategory = ' (Moderado)';
    } else if (this.uvCode >= 6 && this.uvCode <= 7) {
      this.uvCategory = ' (Alto)';
    } else if (this.uvCode >= 8 && this.uvCode <= 10) {
      this.uvCategory = ' (Muy alto)';
    } else if (this.uvCode >= 11) {
      this.uvCategory = ' (Extremo)';
    }
  }

  getSwiperStyles() {
    this.colorTheme = this.modeToggleService.getCurrentMode();
    if (this.colorTheme === 'dark') {
      return {
        '--swiper-navigation-color': '#ffffff',
        '--swiper-pagination-color': '#ffffff',
        '--swiper-pagination-bullet-inactive-color': '#ffffff'
      };
    } else if (this.colorTheme === 'light') {
      return {
        '--swiper-navigation-color': '#000000',
        '--swiper-pagination-color': '#000000',
        '--swiper-pagination-bullet-inactive-color': '#000000'
      };
    } else {
      return {
        '--swiper-navigation-color': '#000000',
        '--swiper-pagination-color': '#000000',
        '--swiper-pagination-bullet-inactive-color': '#000000'
      };
    }
  }

}
