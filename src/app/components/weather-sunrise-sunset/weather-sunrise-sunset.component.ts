import { Component } from '@angular/core';
import { CacheStorageService } from 'src/app/core/services/cache-storage.service';
import { RequestSequenceService } from 'src/app/core/services/request-sequence.service';

@Component({
  selector: 'app-weather-sunrise-sunset',
  templateUrl: './weather-sunrise-sunset.component.html',
  styleUrls: ['./weather-sunrise-sunset.component.scss'],
})
export class WeatherSunriseSunsetComponent {
  sunriseTime!: string;
  sunsetTime!: string;

  constructor(
    private requestSequenceService: RequestSequenceService,
    private cacheStorageService: CacheStorageService,
  ) {
    const saveData = this.cacheStorageService.getData();
    if (saveData) {
      this.sunriseTime = this.removeSeconds(saveData.weatherSunriseSunset.results.sunrise);
      this.sunsetTime = this.removeSeconds(saveData.weatherSunriseSunset.results.sunset);
    } else {
      this.requestSequenceService.getData().subscribe((data) => {
        this.cacheStorageService.saveData(data);
        this.sunriseTime = this.removeSeconds(data.weatherSunriseSunset.results.sunrise);
        this.sunsetTime = this.removeSeconds(data.weatherSunriseSunset.results.sunset);
      });
    }
  }

  removeSeconds(timeString: string): string {
    const timeComponents = timeString.split(':');
    const formattedTime = `${timeComponents[0]}:${timeComponents[1]}`;
    return formattedTime;
  }
}
