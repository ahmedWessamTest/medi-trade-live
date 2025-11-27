import { Injectable } from '@angular/core';
import { API_CONFIG } from '@core/config/api-endpoints';
import { Http } from '@core/services/api.service';
import { Observable } from 'rxjs';
import { IBlog } from '../interface/blog';
import { IBlogs } from '../interface/blogs';

@Injectable({
  providedIn: 'root',
})
export class BlogService extends Http {
  getBlogs(lang: string, page = 1, search = ''): Observable<IBlogs> {
    return this.get<IBlogs>(
      `${API_CONFIG.BASE_URL}/${API_CONFIG.BLOGS}?lang=${lang}&page=${page}&search=${search}`
    );
  }

  getBlogBySlug(slug: string, lang: string): Observable<IBlog> {
    return this.get<IBlog>(`${API_CONFIG.BASE_URL}/${API_CONFIG.BLOGS}/${slug}?lang=${lang}`);
  }
}
