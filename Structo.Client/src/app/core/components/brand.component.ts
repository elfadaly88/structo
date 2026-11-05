import { Component, computed, input } from '@angular/core';

/**
 * Osos brand lockup: the logo mark on a light tile (the mark is navy, so it needs a light background
 * on the dark UI) next to the Arabic/English wordmark.
 */
@Component({
  selector: 'app-brand',
  standalone: true,
  template: `
    <span class="inline-flex items-center gap-2.5 select-none" [attr.aria-label]="'أسس Osos'">
      <img src="assets/brand/osos-mark.png" alt="" width="40" height="40" decoding="async"
           class="rounded-xl bg-white shadow-sm shadow-black/30 ring-1 ring-white/10 shrink-0" [class]="markClass()">
      @if (showText()) {
        <span class="flex flex-col leading-none">
          <span class="font-cairo font-extrabold text-white tracking-tight" [class]="textClass()">أسس</span>
          <span class="font-sans font-bold uppercase tracking-[0.2em] text-[9px] text-slate-400 mt-1">Osos</span>
        </span>
      }
    </span>
  `
})
export class BrandComponent {
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly showText = input(true);

  readonly markClass = computed(() => ({ sm: 'h-8 w-8', md: 'h-9 w-9 sm:h-10 sm:w-10', lg: 'h-14 w-14' })[this.size()]);
  readonly textClass = computed(() => ({ sm: 'text-base', md: 'text-lg', lg: 'text-2xl' })[this.size()]);
}
