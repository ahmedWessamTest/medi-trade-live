import { Injectable } from '@angular/core';
import { API_CONFIG } from '@core/config/api-endpoints';
import { Http } from '@core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService extends Http {
  getSectors(lang: string): Observable<any> {
      return this.get<any>(`${API_CONFIG.BASE_URL}/${API_CONFIG.SECTOR_NAV}?lang=${lang}`);
    }
}
