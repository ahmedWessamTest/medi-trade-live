import { inject, Injectable, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { API_CONFIG } from '@core/config/api-endpoints';
import { Http } from '@core/services/api.service';
import { Observable, of, tap } from 'rxjs';
import { IHome } from '../interface/home';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Home extends Http {
  private transferState = inject(TransferState);
  private _PLATFORM_ID = inject(PLATFORM_ID);
  
  getHome(lang: string): Observable<IHome> {
    const KEY = makeStateKey<any>('homeData');
    if(this.transferState.hasKey(KEY)) {
      const data = this.transferState.get(KEY,null);
      this.transferState.remove(KEY);
      return of(data);
    }
    return this.get<IHome>(`${API_CONFIG.BASE_URL}/${API_CONFIG.HOME}?lang=${lang}`).pipe(tap(data => {
      if(isPlatformServer(PLATFORM_ID)){
        this.transferState.set(KEY,data);
      }
    }));
  }
}
