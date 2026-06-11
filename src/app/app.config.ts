import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideServiceWorker('ngsw-worker.js', { enabled: true, registrationStrategy: 'registerWhenStable:30000' }),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  ],
};
