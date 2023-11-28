import { OffcanvasConfigurationService } from 'src/app/core/services/offcanvas-configuration.service';
import { Component, OnInit } from '@angular/core';
import { OffcanvasService } from 'src/app/core/services/offcanvas.service';
import { TemperatureService } from 'src/app/core/services/temperature.service';

@Component({
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrls: ['./offcanvas.component.scss'],
})
export class OffcanvasComponent implements OnInit {
  public isOpen = false;
  public menu = false;
  public menuBtn: boolean = true;
  public selectedUnit: 'celsius' | 'fahrenheit' = 'celsius';

  constructor(
    private offcanvasService: OffcanvasService,
    private offcanvasConfigurationService: OffcanvasConfigurationService,
    private temperatureService: TemperatureService
  ) {
    this.offcanvasService.isOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
  }

  ngOnInit() {
    this.selectedUnit = this.temperatureService.isFahrenheit
      ? 'fahrenheit'
      : 'celsius';
    this.offcanvasConfigurationService.getMenuBtnState().subscribe((state) => {
      this.menuBtn = state;
    });
  }

  onUnitChange() {
    this.temperatureService.setUnit(this.selectedUnit);
  }

  closeOffcanvas() {
    this.offcanvasService.closeOffcanvas();
  }
  goToConfig() {
    this.menu = true;
  }
  backward() {
    this.menu = false;
  }
  toggleMenuOption(option: string) {
    this.offcanvasConfigurationService.toggleMenuOption(option);
    this.menuBtn = false;
  }
}
