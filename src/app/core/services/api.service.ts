import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Http {
  public http = inject(HttpClient);

  /**
   * HTTP GET request
   */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(endpoint);
  }

  /**
   * HTTP POST request
   */
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(endpoint, data);
  }

  /**
   * HTTP PUT request
   */
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(endpoint, data);
  }

  patch<T>(endpoint: string, data: any): Observable<T> {
    return this.http.patch<T>(endpoint, data);
  }
}
