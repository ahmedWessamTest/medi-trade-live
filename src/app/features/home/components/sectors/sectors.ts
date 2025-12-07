import { Component, input, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Sector } from './../../interface/home';
import { NgOptimizedImage } from '@angular/common';

export interface sectorData {
  sectors: Sector[];
  sectors_body: string;
}
@Component({
  selector: 'app-sectors-section',
  imports: [TranslatePipe, RouterLink,NgOptimizedImage],
  templateUrl: './sectors.html',
  styleUrl: './sectors.css',
})
export class SectorsSection {
  sectorsData = input<any>();
  bgColor =  input<boolean>(false);
}
