import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuState } from 'src/app/core/interfaces/offcanvas-menu.interface';
import { OffcanvasConfigurationService } from 'src/app/core/services/offcanvas-configuration.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  public menuState: MenuState;
  private subscription!: Subscription;

  constructor(
    private offcanvasConfigurationService: OffcanvasConfigurationService
  ) {
    this.menuState = this.offcanvasConfigurationService.getMenuState();
  }

  ngOnInit(): void {
    this.subscription = this.offcanvasConfigurationService.optionSelected$.subscribe((option) => {
      this.menuState = this.offcanvasConfigurationService.getMenuState();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleMenuOption(option: string): void {
    this.offcanvasConfigurationService.toggleMenuOption(option);
  }

  forward(option: string): void {
    this.offcanvasConfigurationService.toggleMenuOption(option);
  }

  @Output() buttonClick = new EventEmitter<void>();
  showBtn(){
    this.buttonClick.emit();
  }
}
