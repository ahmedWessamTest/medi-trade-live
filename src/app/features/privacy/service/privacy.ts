import { Injectable } from '@angular/core';
import { API_CONFIG } from '@core/config/api-endpoints';
import { Http } from '@core/services/api.service';
import { Observable } from 'rxjs';
import { IPrivacyPolicy } from '../interface/privacy';

@Injectable({
  providedIn: 'root',
})
export class PrivacyService extends Http {
  getPrivacyPolicy(lang: string): Observable<IPrivacyPolicy> {
    return this.get<IPrivacyPolicy>(
      `${API_CONFIG.BASE_URL}/${API_CONFIG.PRIVACY_POLICY}?lang=${lang}`
    );
  }
}
