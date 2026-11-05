import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/** Per-route SEO settings, set as `data: { seo: { ... } }` on a route. */
export interface RouteSeo {
  title?: string;
  description?: string;
  /** false keeps the page out of search results (private, personal or token pages). */
  index?: boolean;
}

const SITE_NAME = 'أسس Osos';
const DEFAULT_TITLE = 'أسس | برنامج إدارة عُهد ومصاريف مواقع التشطيبات والمقاولات';
const DEFAULT_DESCRIPTION =
  'أسس (Osos) منصة عربية لشركات التشطيبات والمقاولات والمهندسين: اضبط عُهد مهندسي الموقع وتسوياتهم بالفواتير، وتابع مصاريف كل مشروع وتقدّم التنفيذ لحظياً. ابدأ بمشروعين مجاناً.';

/**
 * Keeps <title>, description, robots, canonical and Open Graph tags in sync with the active route.
 * Dashboard pages are noindex by default; public marketing pages are indexable.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  init(): void {
    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe((e) => {
      this.apply(this.collect(this.router.routerState.snapshot.root), e.urlAfterRedirects);
    });
  }

  /** Lets a page refine its own title/description once data is loaded (e.g. a project name). */
  update(seo: RouteSeo): void {
    this.apply(seo, this.router.url);
  }

  private collect(snapshot: ActivatedRouteSnapshot): RouteSeo {
    let seo: RouteSeo = {};
    let node: ActivatedRouteSnapshot | null = snapshot;
    while (node) {
      if (node.data?.['seo']) seo = { ...seo, ...node.data['seo'] };
      node = node.firstChild;
    }
    return seo;
  }

  private apply(seo: RouteSeo, url: string): void {
    const path = (url || '/').split(/[?#]/)[0];
    const isPrivate = /^\/(dashboard|superadmin|admin|track|public\/project-review)(\/|$)/.test(path);
    const index = seo.index ?? !isPrivate;

    const title = seo.title ? `${seo.title} | ${SITE_NAME}` : DEFAULT_TITLE;
    const description = seo.description || DEFAULT_DESCRIPTION;
    const canonical = `${this.document.location.origin}${path === '/' ? '/' : path}`;

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'robots', content: index ? 'index, follow, max-image-preview:large' : 'noindex, nofollow' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = canonical;
  }
}
