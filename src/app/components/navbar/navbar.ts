import { AsyncPipe, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, inject, NgZone, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MainBtnComponent } from '@shared/components/main-btn/main-btn.component';
import { debounceTime, fromEvent, Subscription, throttleTime } from 'rxjs';
import { LocalizationService } from '../../core/services/localization.service';

@Component({
  selector: 'app-navbar',
  imports: [
    TranslatePipe,
    RouterLink,
    AsyncPipe,
    NgOptimizedImage,
    MainBtnComponent,
    RouterLinkActive,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  navbarItems = [
    { id: 2, name: 'navbar.about', link: 'about-us' },
    { id: 3, name: 'navbar.partners', link: 'partners' },
    { id: 4, name: 'navbar.sectors', link: 'sectors' },
    { id: 5, name: 'navbar.blogs', link: 'blogs' },
    { id: 6, name: 'navbar.media', link: 'media' },
    { id: 7, name: 'navbar.contact', link: 'contact-us' },
  ];
  baseBtn = {
    text: 'navbar.contact',
    link: 'contact-us',
    target: '',
    class: {
      bgColor: 'bg-alt-btn',
      textColor: 'text-black',
      borderRadius: 'rounded-[10px]',
      lineHeight: 'line-height-[35px]',
      padding: 'py-[14px] px-[45px]',
      fontWeight: 'font-medium',
    },
  };
  showMenu: boolean = false;
  isMenuOpen = false;
  isRtl = false;
  isScrolled = signal(false);

  private router = inject(Router);

  private languageService = inject(LocalizationService);

  private platformId = inject(PLATFORM_ID);

  private elementRef = inject(ElementRef);

  private zone = inject(NgZone);

  private readonly DESKTOP_BREAKPOINT = 1536;

  currentLang$ = this.languageService.getLanguage();

  ngOnInit(): void {
    this.zone.runOutsideAngular(()=>{
      fromEvent(window,'scroll').pipe(throttleTime(100,undefined,{trailing:true})).subscribe(()=>{
        const scrolled = window.scrollY > 100;
        if(this.isScrolled() !== scrolled) {
          this.isScrolled.set(scrolled)
        }
      })
      if (isPlatformBrowser(this.platformId)) {
      fromEvent(window, 'resize')
        .pipe(debounceTime(150))
        .subscribe(() => {
          this.checkScreenWidth();
        });
      // Initial screen width check
      this.checkScreenWidth();
    }
    })
    this.currentLang$.subscribe((lang) => {
      this.isRtl = lang === 'ar';
    });
    
  }

  

  private checkScreenWidth(): void {
    if (window.innerWidth >= this.DESKTOP_BREAKPOINT && this.isMenuOpen) {
      this.isMenuOpen = false;
      document.body.classList.remove('scroll-lock');
    }
  }

  changeLang(lang: string): void {
    // If mobile menu is open, close it with animation first
    if (this.isMenuOpen) {
      this.closeMobileMenuWithAnimation(() => {
        this.performLanguageChange(lang);
      });
    } else {
      // Otherwise, just change language
      this.performLanguageChange(lang);
    }
  }

  /**
   * Generate the correct route for language switching
   * @param lang Target language code
   * @returns Route array for RouterLink
   */
  getLanguageRoute(lang: string): string[] {
    const currentUrl = this.router.url;
    const cleanUrl = currentUrl.includes('?') ? currentUrl.split('?')[0] : currentUrl;
    const segments = cleanUrl.split('/');

    if (segments.length > 1) {
      segments[1] = lang;
    }

    return [segments.join('/')];
  }

  // Helper method to perform the actual language change
  private performLanguageChange(lang: string): void {
    // Close the language menu
    this.closeLanguageMenu();
    // Allow any DOM updates to complete before changing language
    setTimeout(() => {
      const currentUrl = this.router.url;
      this.languageService.changeLanguage(lang, currentUrl);
      this.isRtl = lang === 'ar';
    }, 0);
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  closeLanguageMenu(): void {
    this.showMenu = false;
  }

  /**
   * Handle keyboard events for dropdown menu items
   */
  handleDropdownKeydown(event: KeyboardEvent, lang?: string): void {
    if (event.key === 'Enter' && lang) {
      this.changeLang(lang);
      event.preventDefault();
    }

    if (event.key === 'Escape') {
      this.showMenu = false;
      event.preventDefault();
    }
  }

  toggleMobileMenu(): void {
    // If menu is currently closed and we're opening it
    if (!this.isMenuOpen) {
      this.openMobileMenu();
    } else {
      this.closeMobileMenuWithAnimation();
    }
  }

  /**
   * Opens the mobile menu with animation
   */
  private openMobileMenu(): void {
    this.isMenuOpen = true;
    this.showMenu = false; // Close language dropdown when opening mobile menu

    // Prevent body scroll when menu is open
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.add('scroll-lock');
    }

    // Ensure the menu slides in from the correct direction after DOM update
    setTimeout(() => {
      const menuElement = this.elementRef.nativeElement.querySelector(
        '.mobile-menu-container .fixed'
      );
      if (menuElement) {
        menuElement.classList.remove(this.isRtl ? 'translate-x-full' : '-translate-x-full');
        menuElement.classList.add('translate-x-0');
      }
    }, 0);
  }

  /**
   * Closes the mobile menu with animation
   * @param callback Optional callback to execute after menu is closed
   */
  private closeMobileMenuWithAnimation(callback?: () => void): void {
    // First trigger the animation by removing the transform class
    const menuElement = this.elementRef.nativeElement.querySelector(
      '.mobile-menu-container .fixed'
    );
    if (menuElement) {
      menuElement.classList.remove('translate-x-0');
      menuElement.classList.add(this.isRtl ? 'translate-x-full' : '-translate-x-full');
    }

    // After animation completes, hide the menu completely
    setTimeout(() => {
      this.isMenuOpen = false;
      // Restore body scroll
      if (isPlatformBrowser(this.platformId)) {
        document.body.classList.remove('scroll-lock');
      }

      // Execute callback if provided
      if (callback) {
        callback();
      }
    }, 300); // Match this with CSS transition duration
  }

  /**
   * Handles navigation click - closes mobile menu with animation
   */
  onNavigationClick(): void {
    if (this.isMenuOpen) {
      this.closeMobileMenuWithAnimation();
    }
  }
}
