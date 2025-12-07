import { SeoITags } from './../../../../core/interface/common';
import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LocalizationService } from '@core/services/localization.service';
import { SeparatedSeoTags } from '@core/services/sperated-seo-tags';
import { IBlogs } from '@features/blogs/interface/blogs';
import { BlogService } from '@features/blogs/services/blog';
import { Blog } from '@features/home/components/blog/blog';
import { TranslatePipe } from '@ngx-translate/core';
import { Banner } from '@shared/components/banner/banner';
import { ContactForm } from '@shared/components/contact-form/contact-form';
import { BannerSkeletonComponent } from '@shared/components/skeleton-loader/banner-skeleton/banner-skeleton.component';
import { ContactUsFormSkeletonloaderComponent } from '@shared/components/skeleton-loader/contact-us-form-skeletonloader/contact-us-form-skeletonloader.component';
import { SkeletonLoaderMediaComponent } from '@shared/components/skeleton-loader/skeleton-loader-media/skeleton-loader-media.component';
import { debounceTime, distinctUntilChanged, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-blogs',
  imports: [
    BannerSkeletonComponent,
    TranslatePipe,
    ContactForm,
    ContactUsFormSkeletonloaderComponent,
    Blog,
    SkeletonLoaderMediaComponent,
    RouterLink,
    AsyncPipe,
    Banner,
  ],
  templateUrl: './blogs.html',
  styleUrl: './blogs.css',
})
export class Blogs implements OnInit, OnDestroy {
  private blogService = inject(BlogService);

  private route = inject(ActivatedRoute);

  private destroy$ = new Subject<void>();

  private separatedSeoTags = inject(SeparatedSeoTags);

  currentLang$ = inject(LocalizationService).getLanguage();

  isLoading = signal<boolean>(true);

  blogsData = signal<IBlogs | null>(null);

  currentPage = signal<number>(1);

  private searchSubject = new Subject<string>();
  searchTerm = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const page = +params['page'] || 1;
      this.currentPage.set(page);
      this.getBlogsData();
    });

    this.searchSubject
      .pipe(
        debounceTime(400), // wait 0.4s after typing stops
        distinctUntilChanged(),
        switchMap((term) =>
          this.currentLang$.pipe(
            switchMap((lang) =>
              this.blogService.getBlogs(lang, this.currentPage(), term.trim().toLowerCase())
            )
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        this.blogsData.set(res);
        this.isLoading.set(false);
        this.separatedSeoTags.getSeoTagsDirect(
          this.blogsData()?.seo_tags ?? {} as SeoITags,
          this.blogsData()?.banner_image ?? '',
          'blogs'
        );
      });
  }

  getBlogsData() {
    this.isLoading.set(true);
    this.currentLang$
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        switchMap((lang) => this.blogService.getBlogs(lang, this.currentPage(), this.searchTerm))
      )
      .subscribe((res) => {
        this.blogsData.set(res);
        this.currentPage.set(res.meta.current_page);
        this.isLoading.set(false);
      });
  }

  onPageChange(page: number): void {
    if (page !== this.currentPage()) {
      this.currentPage.set(page);
      this.getBlogsData();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value.trim();
    this.searchSubject.next(this.searchTerm);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
