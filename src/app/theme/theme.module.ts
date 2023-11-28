import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemesComponent } from './components/themes.component';
import { MODE_STORAGE_SERVICE, ModeLocalStorageService } from './services/themes-storage.service';
import { ModeToggleService } from './services/themes-toggle.service';


@NgModule({
  declarations: [ThemesComponent],
  providers: [
    ModeToggleService,
    {
      provide: MODE_STORAGE_SERVICE,
      useClass: ModeLocalStorageService,
    },
  ],
  imports: [CommonModule, FormsModule],
  exports: [ThemesComponent],
})
export class ThemeModule {}
