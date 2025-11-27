import { Injectable } from '@angular/core';
import { API_CONFIG } from '@core/config/api-endpoints';
import { Http } from '@core/services/api.service';
import { Observable } from 'rxjs';
import { IContactUsPage } from '../interface/contacUs';

@Injectable({
  providedIn: 'root',
})
export class ContactUsData extends Http {
  contactInformation(lang: string): Observable<IContactUsPage> {
    return this.get<IContactUsPage>(
      `${API_CONFIG.BASE_URL}/${API_CONFIG.CONTACT_INFO}?lang=${lang}`
    );
  }
}
