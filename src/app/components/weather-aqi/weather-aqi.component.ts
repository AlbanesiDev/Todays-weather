import { Component, HostListener, OnInit } from '@angular/core';
import { CacheStorageService } from 'src/app/core/services/cache-storage.service';
import { RequestSequenceService } from 'src/app/core/services/request-sequence.service';

@Component({
  selector: 'app-weather-aqi',
  templateUrl: './weather-aqi.component.html',
  styleUrls: ['./weather-aqi.component.scss'],
})
export class WeatherAQIComponent implements OnInit {
  private aqiLevels: string[] = [
    'Buena',
    'Admisible',
    'Insalubre para personas Sensibles',
    'Mala',
    'Muy Mala',
    'Peligrosa',
  ];
  private aqiCaptions: string[] = [
    'La calidad del aire es buena.',
    'La calidad del aire es aceptable.',
    'Las personas sensibles pueden experimentar efectos sobre su salud.',
    'Todas las personas pueden comnezar a experimentar efectos sobre su salud.',
    'Alerta sanitaria: Todo el munedo puede experimentar efectos graves de salud.',
    'Advertencias sanitarias de condiciones de emergencia.',
  ];
  private aqiColors: string[] = [
    '#a2dc61',
    '#fbd651',
    '#fd9a57',
    '#ff6a6e',
    '#a97bbc',
    '#9b5973',
  ];
  public aqiSteps: number[] = [
    0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500,
  ];
  public aqiTable: any[] = [
    ['', '', 'SO2', 'NO2', 'PM10', 'PM2.5', 'O3', 'CO'],
    [
      'Buena',
      '1',
      '[0; 20)',
      '[0; 40)',
      '[0; 20)',
      '[0; 10)',
      '[0; 60)',
      '[0; 4400)',
    ],
    [
      'Admisible',
      '2',
      '[20; 80)',
      '[40; 70)',
      '[20; 50)',
      '[10; 25)',
      '[60; 100)',
      '[4400; 9400)',
    ],
    [
      'Insalubre para personas Sensibles',
      '3',
      '[80; 250)',
      '[70; 150)',
      '[50; 100)',
      '[25; 50)',
      '[100; 140)',
      '[9400-12400)',
    ],
    [
      'Mala',
      '4',
      '[250; 350)',
      '[150; 200)',
      '[100; 200)',
      '[50; 75)',
      '[140; 180)',
      '[12400; 15400)',
    ],
    ['Muy Mala', '5', '⩾350', '⩾200', '⩾200', '⩾75', '⩾180', '⩾15400'],
  ];
  private startX!: number;

  public aqiCO!: string;
  public aqiSO!: string;
  public aqiNH3!: string;
  public aqiNO!: string;
  public aqiNO2!: string;
  public aqiO3!: string;
  public aqiPM25!: string;
  public aqiPM10!: string;
  public aqiIca: string;

  public aqiLevel!: string;
  public aqiCaption!: string;
  public openQuestionCard: boolean = false;

  public aqiTab: boolean = false;
  public aqiTabVisible: boolean = false;
  public aqiTabDescription: boolean = true;
  public aqiTabTable: boolean = true;

  constructor(
    private cacheStorageService: CacheStorageService,
    private requestSequenceService: RequestSequenceService
  ) {
    this.getAqi();
    this.getICA();
    this.aqiIca = this.getICA().toString();
  }

  ngOnInit() {
    const aqiInfo = this.getLevelAqi();
    this.aqiLevel = aqiInfo.aqiLevel;
    this.aqiCaption = aqiInfo.aqiCaption;
    this.aqiShowTab();
  }

  getAqi() {
    const saveData = this.cacheStorageService.getData();
    if (saveData) {
      this.aqiCO = saveData.weatherOwmAirPolution.list[0].components.co;
      this.aqiNH3 = saveData.weatherOwmAirPolution.list[0].components.nh3;
      this.aqiNO = saveData.weatherOwmAirPolution.list[0].components.no;
      this.aqiNO2 = saveData.weatherOwmAirPolution.list[0].components.no2;
      this.aqiO3 = saveData.weatherOwmAirPolution.list[0].components.o3;
      this.aqiPM10 = saveData.weatherOwmAirPolution.list[0].components.pm10;
      this.aqiSO = saveData.weatherOwmAirPolution.list[0].components.so2;
      this.aqiPM25 = saveData.weatherOwmAirPolution.list[0].components.pm2_5;
    } else {
      this.requestSequenceService.getData().subscribe((data) => {
        this.cacheStorageService.saveData(data);
      });
    }
  }
  getICA(): number {
    const IhPm25 = 25;
    const IhPm10 = 50;
    const IhO3 = 120;
    const IhNO2 = 200;
    const IhSO2 = 100;

    let icaPm25 =
      ((50 - 0) / (IhPm25 - 0)) * (parseFloat(this.aqiPM25) - 0) + 0;
    let icaPm10 =
      ((50 - 0) / (IhPm10 - 0)) * (parseFloat(this.aqiPM10) - 0) + 0;
    let icaO3 = ((120 - 0) / (IhO3 - 0)) * (parseFloat(this.aqiO3) - 0) + 0;
    let icaNO2 = ((200 - 0) / (IhNO2 - 0)) * (parseFloat(this.aqiNO2) - 0) + 0;
    let icaSO2 = ((100 - 0) / (IhSO2 - 0)) * (parseFloat(this.aqiSO) - 0) + 0;

    let icaTotal = Math.max(icaPm25, icaPm10, icaO3, icaNO2, icaSO2);

    return Math.round(icaTotal);
  }
  getAqiColor() {
    const aqiIcaNumber = parseFloat(this.aqiIca);
    if (!isNaN(aqiIcaNumber)) {
      if (
        aqiIcaNumber >= this.aqiSteps[0] &&
        aqiIcaNumber <= this.aqiSteps[1]
      ) {
        return this.aqiColors[0];
      } else if (
        aqiIcaNumber > this.aqiSteps[1] &&
        aqiIcaNumber <= this.aqiSteps[2]
      ) {
        return this.aqiColors[1];
      } else if (
        aqiIcaNumber > this.aqiSteps[2] &&
        aqiIcaNumber <= this.aqiSteps[3]
      ) {
        return this.aqiColors[2];
      } else if (
        aqiIcaNumber > this.aqiSteps[3] &&
        aqiIcaNumber <= this.aqiSteps[4]
      ) {
        return this.aqiColors[3];
      } else if (
        aqiIcaNumber > this.aqiSteps[4] &&
        aqiIcaNumber <= this.aqiSteps[5]
      ) {
        return this.aqiColors[4];
      } else if (
        aqiIcaNumber > this.aqiSteps[5] &&
        aqiIcaNumber <= this.aqiSteps[6]
      ) {
        return this.aqiColors[5];
      } else if (aqiIcaNumber > this.aqiSteps[6]) {
        return this.aqiColors[5];
      } else {
        return '#000000';
      }
    } else {
      return '#000000';
    }
  }
  getLevelAqi() {
    const aqiIcaNumber = parseFloat(this.aqiIca);
    if (!isNaN(aqiIcaNumber)) {
      if (
        aqiIcaNumber >= this.aqiSteps[0] &&
        aqiIcaNumber <= this.aqiSteps[1]
      ) {
        return { aqiLevel: this.aqiLevels[0], aqiCaption: this.aqiCaptions[0] };
      } else if (
        aqiIcaNumber > this.aqiSteps[1] &&
        aqiIcaNumber <= this.aqiSteps[2]
      ) {
        return { aqiLevel: this.aqiLevels[1], aqiCaption: this.aqiCaptions[1] };
      } else if (
        aqiIcaNumber > this.aqiSteps[2] &&
        aqiIcaNumber <= this.aqiSteps[3]
      ) {
        return { aqiLevel: this.aqiLevels[2], aqiCaption: this.aqiCaptions[2] };
      } else if (
        aqiIcaNumber > this.aqiSteps[3] &&
        aqiIcaNumber <= this.aqiSteps[4]
      ) {
        return { aqiLevel: this.aqiLevels[3], aqiCaption: this.aqiCaptions[3] };
      } else if (
        aqiIcaNumber > this.aqiSteps[4] &&
        aqiIcaNumber <= this.aqiSteps[5]
      ) {
        return { aqiLevel: this.aqiLevels[4], aqiCaption: this.aqiCaptions[4] };
      } else if (
        aqiIcaNumber > this.aqiSteps[5] &&
        aqiIcaNumber <= this.aqiSteps[6]
      ) {
        return { aqiLevel: this.aqiLevels[4], aqiCaption: this.aqiCaptions[4] };
      } else if (aqiIcaNumber > this.aqiSteps[6]) {
        return { aqiLevel: this.aqiLevels[5], aqiCaption: this.aqiCaptions[5] };
      } else {
        return { aqiLevel: 'Valor no válido', aqiCaption: 'Error' };
      }
    } else {
      return { aqiLevel: 'Valor no válido', aqiCaption: 'Error' };
    }
  }
  getSelectLeftPosition(): number {
    const aqiIcaNumber = parseFloat(this.aqiIca);
    const maxAqi = this.aqiSteps[this.aqiSteps.length - 1];
    const normalizedValue = Math.min(aqiIcaNumber, maxAqi);
    const positionPercentage = (normalizedValue / maxAqi) * 100;
    return positionPercentage;
  }

  openQuestion() {
    this.openQuestionCard = !this.openQuestionCard;
  }

  closeQuestion() {
    this.openQuestionCard = false;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
  }
  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    const currentX = event.touches[0].clientX;
    const deltaX = currentX - this.startX;

    if (deltaX > 150) {
      this.closeQuestion();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.aqiShowTab();
  }

  private aqiShowTab(): void {
    this.aqiTabVisible = window.innerWidth <= 1720;
    if (window.innerWidth >= 1720) {
      this.aqiTabDescription = true;
      this.aqiTabTable = true;
    } else {
      this.aqiTab = true;
      this.aqiTabDescription = true;
      this.aqiTabTable = false;
    }
  }

  toggleTab() {
    this.aqiTab = !this.aqiTab;
    this.aqiTabDescription = !this.aqiTabDescription;
    this.aqiTabTable = !this.aqiTabTable;
  }
}
