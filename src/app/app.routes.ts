import { Routes } from '@angular/router';
import { LangGuard } from '@core/guards/lang-guard';
import { HomePage } from '@features/home/home-page';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  /* Root redirect to default language */
  { path: '', redirectTo: '/ar', pathMatch: 'full' },

  /* Main layout */
  {
    path: ':lang',
    component: MainLayout,
    canActivate: [LangGuard],

    children: [
      /* Home */
      {
        path: '',
        component: HomePage,
      },

      {
        path: 'blogs',
        loadChildren: () => import('@features/blogs/routes/blogs.routes'),
      },
      {
        path: 'about-us',
        loadComponent: () => import('@features/about-us/about-us').then((m) => m.AboutUs),
      },

      {
        path: 'partners',
        loadComponent: () => import('@features/partners/partners-page').then((m) => m.PartnersPage),
      },

      {
        path: 'sectors',
        loadComponent: () =>
          import('@features/sectors/components/sector-wrapper/sector-wrapper').then(
            (m) => m.SectorWrapper
          ),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('@features/sectors/pages/sectors/sectors').then((m) => m.Sectors),
          },

          {
            path: ':slug',
            loadComponent: () =>
              import('@features/sectors/pages/sector-id/sector-id').then((m) => m.SectorId),
          },
        ],
      },

      {
        path: 'media',
        loadComponent: () => import('@features/media/media').then((m) => m.Media),
      },

      {
        path: 'contact-us',
        loadComponent: () => import('@features/contact-us/contact-us').then((m) => m.ContactUs),
      },

      {
        path: 'privacy-policy',
        loadComponent: () => import('@features/privacy/privacy').then((m) => m.Privacy),
      },

      {
        path: 'notfound',
        loadComponent: () => import('@components/not-found/not-found').then((m) => m.NotFounde),
      },
      { path: '**', redirectTo: 'notfound' },
    ],
  },
];
