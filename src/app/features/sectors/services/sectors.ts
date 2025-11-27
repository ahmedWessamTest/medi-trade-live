import { Injectable } from '@angular/core';
import { API_CONFIG } from '@core/config/api-endpoints';
import { Http } from '@core/services/api.service';
import { Observable } from 'rxjs';
import { ISectorSlug } from '../interface/sector-slug';
import { ISectors } from '../interface/sectors';

@Injectable({
  providedIn: 'root',
})
export class SectorsService extends Http {
  getSectors(lang?: string): Observable<ISectors> {
    return this.get<ISectors>(`${API_CONFIG.BASE_URL}/${API_CONFIG.SECTORS}?lang=${lang}`);
  }

  getSectorsBySlug(slug: string, lang?: string): Observable<ISectorSlug> {
    return this.get<ISectorSlug>(
      `${API_CONFIG.BASE_URL}/${API_CONFIG.SECTORS}/${slug}?lang=${lang}`
    );
  }
}
