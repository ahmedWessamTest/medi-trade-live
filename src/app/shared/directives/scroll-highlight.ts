// scroll-highlight.directive.ts
import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[scrollHighlight]',
  standalone: true,
})
export class ScrollHighlightDirective implements OnInit, OnDestroy {
  private highlightOverlay!: HTMLElement;
  private scrollListener!: () => void;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.createHighlightOverlay();
    this.updateHighlight();

    // Listen to scroll events
    this.scrollListener = this.renderer.listen(this.el.nativeElement, 'scroll', () =>
      this.updateHighlight()
    );
  }

  private createHighlightOverlay() {
    const container = this.el.nativeElement;
    console.log('container', container);

    // Create overlay element
    this.highlightOverlay = this.renderer.createElement('div');
    this.renderer.setStyle(this.highlightOverlay, 'position', 'absolute');
    this.renderer.setStyle(this.highlightOverlay, 'left', '0');
    this.renderer.setStyle(this.highlightOverlay, 'right', '0');
    this.renderer.setStyle(this.highlightOverlay, 'background', 'rgba(255, 255, 0, 0.2)');
    this.renderer.setStyle(this.highlightOverlay, 'pointerEvents', 'none');
    this.renderer.setStyle(this.highlightOverlay, 'transition', 'all 0.2s ease');
    this.renderer.setStyle(this.highlightOverlay, 'zIndex', '1');

    // Make container relative positioned
    this.renderer.setStyle(container, 'position', 'relative');

    // Add overlay to container
    this.renderer.appendChild(container, this.highlightOverlay);
  }

  private updateHighlight() {
    const container = this.el.nativeElement;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight; // Total content height
    const containerHeight = container.clientHeight; // Visible height

    // Calculate scrollbar thumb height (proportional to content)
    const scrollbarThumbHeight = (containerHeight / scrollHeight) * containerHeight;

    // Calculate scrollbar thumb position
    const maxScroll = scrollHeight - containerHeight;
    const scrollPercentage = maxScroll > 0 ? scrollTop / maxScroll : 0;
    const scrollbarThumbTop = scrollPercentage * (containerHeight - scrollbarThumbHeight);

    // Map scrollbar position to content position
    const highlightTop = scrollTop + scrollbarThumbTop;
    const highlightHeight = scrollbarThumbHeight;

    // Update overlay position
    this.renderer.setStyle(this.highlightOverlay, 'top', `${highlightTop}px`);
    this.renderer.setStyle(this.highlightOverlay, 'height', `${highlightHeight}px`);
  }

  ngOnDestroy() {
    if (this.scrollListener) {
      this.scrollListener();
    }
    if (this.highlightOverlay) {
      this.renderer.removeChild(this.el.nativeElement, this.highlightOverlay);
    }
  }
}
