import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { API_CONFIG } from '@core/config/api-endpoints';
import { CustomSanitizePipe } from '@core/pipes/custom-sanitize-pipe';
import { LocalizationService } from '@core/services/localization.service';
import {  Type } from '@features/sectors/interface/sector-slug';
import { SectorsService } from '@features/sectors/services/sectors';
import {  TranslateService } from '@ngx-translate/core';
import { ScrollHighlightDirective } from '@shared/directives/scroll-highlight';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { distinctUntilChanged, Observable, of, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-type-modal',
  imports: [
    ScrollHighlightDirective,
    CarouselModule,
    CustomSanitizePipe,
    ScrollHighlightDirective,
  ],
  templateUrl: './type-modal.html',
  styleUrl: './type-modal.css',
})
export class TypeModal {
  constructor() {
    this.langSubscription = this.languageService.getLanguage().subscribe((lang) => {
      this.currentLang.set(lang);
    });
  }

  private destroy$ = new Subject<void>();

  private sectorsService = inject(SectorsService);

  private route = inject(ActivatedRoute);
  private router = inject(Router)
  private translate = inject(TranslateService);


  private languageService = inject(LocalizationService);

  private langSubscription?: Subscription;

 imagesUrl:string = API_CONFIG.BASE_URL.replace(/\/api$/, '')

  sectorTypeSlug: Type = {} as Type;

  slug: string = '';
  typeSlug:string ='';

  isLoading = signal<boolean>(true);

ngOnInit() { 
  combineLatest([
  this.route.params,
  (this.route.parent?.params || of({})) as Observable<Params>,
  this.languageService.getLanguage()
])
.pipe(
  distinctUntilChanged(), 
  switchMap(([params, parentParams, lang]) => {
    const pParams = parentParams as Params;
    this.slug = pParams['slug']; 
    this.typeSlug = params['type-slug'];

    if (!this.slug || !this.typeSlug) return of(null); 

    this.isLoading.set(true);  
    return this.sectorsService.getSectorsTypeBySlug(
      decodeURIComponent(this.slug), 
      decodeURIComponent(this.typeSlug), 
      lang
    );
  }),
  takeUntil(this.destroy$)
)
  .subscribe((res) => {
    if (res) {
      this.sectorTypeSlug = res;
      this.isLoading.set(false);
    }
  });
}

  customTranslate(path: string) {
    return this.translate.instant(path) + ' - ' + this.sectorTypeSlug.title;
  }


  currentLang = signal<string>('ar');

  customOptions = computed<OwlOptions>(() => {
    const isRtl = this.currentLang() === 'ar';
    return {
      loop: true,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      nav: true,
      navSpeed: 800,
      rtl: isRtl,
      navText: [
        '<img loading="lazy" src="/images/left.webp" alt="arrow" class="w-15.75" />',
        '<img loading="lazy" src="/images/right.webp" alt="arrow" class="w-15.75" />',
      ],
      responsive: {
        0: {
          items: 1,
        },
      },
      autoplay: true,
      autoplayTimeout: 6000,
      autoplayHoverPause: false,
      margin: 0,
      smartSpeed: 600,
    };
  });



  closeModal(event?: MouseEvent) {  
    if(event) {
      event.stopPropagation();
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.langSubscription?.unsubscribe();
  }
@ViewChild('modalContent') modalContent!: ElementRef;
@HostListener('document:mousedown', ['$event']) // استخدام mousedown أحياناً أدق من click
onClickOutside(event: MouseEvent) {
  if (!this.modalContent) return;

  const clickedElement = event.target as HTMLElement;
  
  // هل العنصر اللي اتداس عليه موجود "جوه" الـ modalContent؟
  const isInside = this.modalContent.nativeElement.contains(clickedElement);

  if (!isInside) {
    console.log('Clicked outside! Closing...');
    this.closeModal(event);
  }
}
}
