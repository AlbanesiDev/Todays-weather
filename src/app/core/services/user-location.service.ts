import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLocationInterface } from '../interfaces/user-location.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserLocationService {
  private ipApiKey = environment.ipApiKey;

  constructor(private http: HttpClient) {}

  getLocation(): Observable<UserLocationInterface> {
    const ipApiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${this.ipApiKey}&fields=geo,languages,time_zone`;
    return this.http.get<UserLocationInterface>(ipApiUrl);
  }
}
