import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ICustomSectorData } from '@features/sectors/pages/sectors/sectors';
import { TranslatePipe } from '@ngx-translate/core';
import { ImageSkeletonComponent } from '@shared/components/skeleton-loader/image-skeleton/image-skeleton.component';

@Component({
  selector: 'app-sector-alt-section',
  imports: [TranslatePipe, ImageSkeletonComponent, RouterLink],
  templateUrl: './sector-alt-section.html',
  styleUrl: './sector-alt-section.css',
})
export class SectorAltSection {
  @Input({ required: true }) sectorsData!: ICustomSectorData;
}
