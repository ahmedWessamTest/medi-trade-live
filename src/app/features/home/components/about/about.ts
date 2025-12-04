import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CustomSanitizePipe } from '@core/pipes/custom-sanitize-pipe';
import { IAbout } from '@features/home/interface/home';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [TranslatePipe, CustomSanitizePipe, NgOptimizedImage],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  @Input({ required: true }) aboutData!: IAbout;
  ngOnChanges(): void {
    this.selectTab(this.aboutData.tabs[0].position);
  }
  activeTab: any;

  selectTab(position: number) {
    if (this.aboutData) {
      const found = this.aboutData.tabs.find((tab) => tab.position === position);
      if (this.aboutData.tabs.length > 0) {
        this.activeTab = this.aboutData.tabs[0];
        this.activeTab = found; // set default tab here
        console.log(this.activeTab);
      }
    }
  }
}
