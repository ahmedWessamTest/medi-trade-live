import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Input, signal, PLATFORM_ID, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactUsService } from '@core/services/contact-us.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-form',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm {
  @Input({ required: true }) contactUsFormImage: string = '';
  private _PLATFORM_ID = inject(PLATFORM_ID);
  width = signal<number>(isPlatformBrowser(this._PLATFORM_ID) ? window.screen.width : 0);
  contactUsService = inject(ContactUsService);

  fb = inject(FormBuilder);
  toastr = inject(ToastrService);

  contactUsForm!: FormGroup;

  ngOnInit(): void {
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
          this.toastr.success('Thank you! Your message has been sent successfully 🎉”');
          this.contactUsForm.reset();
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
