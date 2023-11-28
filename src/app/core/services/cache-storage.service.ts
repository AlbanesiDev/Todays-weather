import { DataUpdateService } from './data-update.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CacheStorageService {
  private storageKey = 'dataKey';

  constructor(private dataUpdateService: DataUpdateService) { }

  getData(): any {
    const sotredData = localStorage.getItem(this.storageKey);
    if (sotredData) {
      const parsedData = JSON.parse(sotredData);
      if (parsedData.expires > Date.now()) {
        return parsedData.data;
      } else {
        localStorage.removeItem(this.storageKey);
      }
    }
    return null;
  }

  saveData(data: any, expirationMinutes: number = 120): void {
    const expirationTime = Date.now() + expirationMinutes * 60 * 1000;
    const dataToStore = {
      data,
      expires: expirationTime,
    };
    localStorage.setItem(this.storageKey, JSON.stringify(dataToStore));
    this.dataUpdateService.emitDataUpdated();
  }
}
