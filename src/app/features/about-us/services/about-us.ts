import { Injectable } from '@angular/core';
import { API_CONFIG } from '@core/config/api-endpoints';
import { Http } from '@core/services/api.service';
import { Observable } from 'rxjs';
import { IAboutUs } from '../interface/about-us';

@Injectable({
  providedIn: 'root',
})
export class AboutUsData extends Http {
  getAboutData(lang?: string): Observable<IAboutUs> {
    return this.get<IAboutUs>(`${API_CONFIG.BASE_URL}/${API_CONFIG.ABOUT_US}?lang=${lang}`);
  }
}
