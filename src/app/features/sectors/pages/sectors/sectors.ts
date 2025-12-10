import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LocalizationService } from '@core/services/localization.service';
import { SeparatedSeoTags } from '@core/services/sperated-seo-tags';
import { SectorAltSection } from '@features/sectors/components/sector-alt-section/sector-alt-section';
import { SectorCard } from '@features/sectors/components/sector-card/sector-card';
import { TranslatePipe } from '@ngx-translate/core';
import { Banner } from '@shared/components/banner/banner';
import { ContactForm } from '@shared/components/contact-form/contact-form';
import { BannerSkeletonComponent } from '@shared/components/skeleton-loader/banner-skeleton/banner-skeleton.component';
import { ContactUsFormSkeletonloaderComponent } from '@shared/components/skeleton-loader/contact-us-form-skeletonloader/contact-us-form-skeletonloader.component';
import { SectorAltSectionSkeletonComponent } from '@shared/components/skeleton-loader/sector-alt-section-skeleton/sector-alt-section-skeleton';
import { SkeletonSectorCard } from '@shared/components/skeleton-loader/skeleton-sector-card/skeleton-sector-card';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { ISector, ISectors } from '../../interface/sectors';
import { SectorsService } from '../../services/sectors';

export interface ICustomSectorData {
  sectors: ISector[];
  sectors_body: string;
}
@Component({
  selector: 'app-sectors',
  imports: [
    Banner,
    TranslatePipe,
    ContactForm,
    SectorAltSection,
    SectorCard,
    ContactUsFormSkeletonloaderComponent,
    SkeletonSectorCard,
    BannerSkeletonComponent,
    SectorAltSectionSkeletonComponent,
  ],
  templateUrl: './sectors.html',
  styleUrl: './sectors.css',
    changeDetection:ChangeDetectionStrategy.OnPush

})
export class Sectors {
  private sectorsService = inject(SectorsService);

  private destroy$ = new Subject<void>();

  private separatedSeoTags = inject(SeparatedSeoTags);

  currentLang$ = inject(LocalizationService).getLanguage();

  sectorsData: ISectors = {} as ISectors;

  customSectorData: ICustomSectorData = {} as ICustomSectorData;

  isLoading = signal<boolean>(true);

  getSectors() {
    this.currentLang$.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((lang) => {
      this.sectorsService.getSectors(lang).subscribe((res) => {
        this.sectorsData = res;
        this.customSectorData = {
          sectors: res.sectors,
          sectors_body: res.sectors_body,
        };
        this.separatedSeoTags.getSeoTagsDirect(
          this.sectorsData.seo_tags,
          this.sectorsData.banner_image,
          'sectors'
        );
        this.isLoading.set(false);
      });
    });
  }

  ngOnInit(): void {
    this.getSectors();
  }
}
