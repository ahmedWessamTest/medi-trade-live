import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const LangGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const lang = route.paramMap.get('lang');
  const supportedLangs = ['en', 'ar'];

  if (!supportedLangs.includes(lang!)) {
    return router.createUrlTree(['/ar']);
  }

  return true;
};
