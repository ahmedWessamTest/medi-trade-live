import { isPlatformBrowser, Location } from '@angular/common';
import {
  Component,
  inject,
  signal,
  PLATFORM_ID,
  HostListener,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalyticsService } from '@core/services/analytics.service';
import { ContactUsService } from '@core/services/contact-us.service';
import { LocalizationService } from '@core/services/localization.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactForm {
  contactUsFormImage = input<string>('');
  private _PLATFORM_ID = inject(PLATFORM_ID);
  private readonly _analyticsService = inject(AnalyticsService);
  width = signal<number>(isPlatformBrowser(this._PLATFORM_ID) ? window.screen.width : 0);
  contactUsService = inject(ContactUsService);
  private router = inject(Router);
  private location = inject(Location);
  fb = inject(FormBuilder);
  toastr = inject(ToastrService);
  private currentLang$ = inject(LocalizationService).getLanguage();
  currentLang = 'ar';
  contactUsForm!: FormGroup;

  ngOnInit(): void {
    this.currentLang$.pipe(distinctUntilChanged()).subscribe((lang) => {
      this.currentLang = lang;
    });
    this.initForm();
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.width.set(window.screen.width);
    }
  }

  initForm() {
    this.contactUsForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[\u0600-\u06FFa-zA-Z\s]+$/),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
          Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/),
        ],
      ],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
          Validators.pattern(/^[\u0600-\u06FFa-zA-Z\s]+$/),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.contactUsForm.valid) {
      this.contactUsService.postContactUs('en', this.contactUsForm.value).subscribe({
        next: (res) => {
          this._analyticsService.trackEvent('form_submission', {
            form_id: 'contactForm',
            status: 'success',
          });
          this.toastr.success('Thank you! Your message has been sent successfully 🎉”');
          this.contactUsForm.reset();
          const currentUrl = decodeURIComponent(this.location.path().split('?')[0]);
          if (!currentUrl.endsWith('/تم')) {
            const queryParams = this.router.parseUrl(this.router.url).queryParams;
            const queryString =
              Object.keys(queryParams).length > 0
                ? '?' + new URLSearchParams(queryParams as any).toString()
                : '';
            this.location.replaceState(
              currentUrl + (this.currentLang === 'ar' ? '/تم' : '/done') + queryString,
            );
          }
        },
        error: (err) => {
          this.toastr.error(err.message);
        },
      });
    } else {
      this.contactUsForm.markAllAsTouched();
    }
  }

  get name() {
    return this.contactUsForm.get('name');
  }
  get email() {
    return this.contactUsForm.get('email');
  }
  get phone() {
    return this.contactUsForm.get('phone');
  }
  get message() {
    return this.contactUsForm.get('message');
  }
  isMobile(): boolean {
    return this.width() > 640;
  }
  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.width.set(window.screen.width);
    }
  }
}
