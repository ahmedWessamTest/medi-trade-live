import { Injectable } from '@angular/core';
import { API_CONFIG } from '@core/config/api-endpoints';
import { IContactInformation, IContactUs } from '@core/interface/contact-us';
import { Observable } from 'rxjs';
import { Http } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService extends Http {
  postContactUs(lang: string, data: IContactUs): Observable<{ message: string }> {
    return this.post<{ message: string }>(`${API_CONFIG.BASE_URL}/${API_CONFIG.CONTACT_US}`, data);
  }

  contactInformation(lang: string): Observable<IContactInformation> {
    return this.get<IContactInformation>(`${API_CONFIG.BASE_URL}/contact-info?lang=${lang}`);
  }
}
