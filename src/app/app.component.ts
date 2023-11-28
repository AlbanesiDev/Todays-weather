import { Component } from '@angular/core';
import { OffcanvasService } from './core/services/offcanvas.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  public currentTime!: string;

  constructor(private offcanvasService: OffcanvasService) {
    const argentinaTime = moment().tz('America/Argentina/Buenos_Aires');
    this.currentTime = argentinaTime.format('HH:mm');
  }
  openOffcanvas(){
    this.offcanvasService.openOffcanvas();
  }
}
