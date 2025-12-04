import { Injectable } from '@angular/core';
import { API_CONFIG } from '@core/config/api-endpoints';
import { Http } from '@core/services/api.service';
import { Observable } from 'rxjs';
import { IPartners } from '../interface/partners';

@Injectable({
  providedIn: 'root',
})
export class Partners extends Http {
  getPartners(lang: string): Observable<IPartners> {
    return this.get<IPartners>(`${API_CONFIG.BASE_URL}/${API_CONFIG.partners}?lang=${lang}`);
  }
}
