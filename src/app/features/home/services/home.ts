import { Injectable } from '@angular/core';
import { API_CONFIG } from '@core/config/api-endpoints';
import { Http } from '@core/services/api.service';
import { Observable } from 'rxjs';
import { IHome } from '../interface/home';

@Injectable({
  providedIn: 'root',
})
export class Home extends Http {
  getHome(lang: string): Observable<IHome> {
    return this.get<IHome>(`${API_CONFIG.BASE_URL}/${API_CONFIG.HOME}?lang=${lang}`);
  }
}
