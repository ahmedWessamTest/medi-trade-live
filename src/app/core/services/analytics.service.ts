import { isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  trackEvent(eventName: string, data: any) {
    if(isPlatformServer(this._PLATFORM_ID)) return;
    const dataLayer = (window as any).dataLayer || [];
    dataLayer.push({
      event: eventName,
      ...data
    });
  }
}