import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DateFnsModule } from 'ngx-date-fns';
import { ThemeModule } from 'src/app/theme/theme.module';
import { RequestSequenceService } from './core/services/request-sequence.service';
import { WeatherTodayComponent } from './components/weather-today/weather-today.component';
import { WeatherForecastComponent } from './components/weather-forecast-hourly/weather-forecast-hourly.component';
import { WeatherSunriseSunsetComponent } from './components/weather-sunrise-sunset/weather-sunrise-sunset.component';
import { WeatherForecastDailyComponent } from './components/weather-forecast-daily/weather-forecast-daily.component';
import { WeatherAQIComponent } from './components/weather-aqi/weather-aqi.component';
import { OffcanvasComponent } from './components/offcanvas/offcanvas.component';
import { ConfigurationComponent } from './components/offcanvas/configuration/configuration.component';
import { TemperaturePipe } from './pipes/temperature.pipe';
import { WeatherUnitsPipe } from './pipes/weather-units.pipe';
import { TranslateDayPipe } from './pipes/translateDay.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WeatherTodayComponent,
    WeatherForecastComponent,
    WeatherSunriseSunsetComponent,
    WeatherForecastDailyComponent,
    WeatherAQIComponent,
    OffcanvasComponent,
    ConfigurationComponent,
    TemperaturePipe,
    WeatherUnitsPipe,
    TranslateDayPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ThemeModule,
    DateFnsModule,
  ],
  providers: [RequestSequenceService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
