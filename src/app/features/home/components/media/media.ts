import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IMedia } from '@features/home/interface/home';
import { TranslatePipe } from '@ngx-translate/core';
import { MainBtnComponent } from '@shared/components/main-btn/main-btn.component';
import { SkeletonLoaderMediaComponent } from '@shared/components/skeleton-loader/skeleton-loader-media/skeleton-loader-media.component';

@Component({
  selector: 'app-media',
  imports: [MainBtnComponent, TranslatePipe, SkeletonLoaderMediaComponent],
  templateUrl: './media.html',
  styleUrl: './media.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Media {
  @Input() mediaData: IMedia[] = [];

  baseBtn = {
    text: 'media.see_all',
    link: 'media',
    target: '',
    class: {
      bgColor: 'bg-transparent',
      textColor: 'text-black',
      borderRadius: 'rounded-[10px]',
      lineHeight: 'line-height-[35px]',
      padding: 'py-[9px] px-[70px]',
      fontWeight: 'font-normal',
      border: 'border border-black',
    },
  };
}
