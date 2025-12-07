import { mergeApplicationConfig, ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => () => {
        const lang = 'ar';
        globalThis.document?.documentElement?.setAttribute('lang', lang);
        globalThis.document?.documentElement?.setAttribute(
          'dir',
          lang === 'ar' ? 'rtl' : 'ltr'
        );
      }
    },
    provideServerRendering(withRoutes(serverRoutes))
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
