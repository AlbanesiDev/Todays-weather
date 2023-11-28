import { Component, OnInit, Renderer2 } from '@angular/core';
import { ModeToggleService } from '../services/themes-toggle.service';

@Component({
  selector: 'app-theme',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss'],
})
export class ThemesComponent implements OnInit {

  constructor(
    private modeToggleService: ModeToggleService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  toggleMode(mode: string) {
    mode === 'dark' ? this.modeToggleService.setDark() : this.modeToggleService.setLight();
    this.applyBodyClass();
  }

  private applyBodyClass() {
    const currentMode = this.modeToggleService.getCurrentMode();
    this.renderer.removeClass(document.body, currentMode === 'light' ? 'dark' : 'light');
    this.renderer.addClass(document.body, currentMode);
  }

  isDarkModeChecked(): boolean {
    return this.modeToggleService.getCurrentMode() === 'dark';
  }

  isLightModeChecked(): boolean {
    return this.modeToggleService.getCurrentMode() === 'light';
  }
}
