import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';
// import { provideRouter } from '@angular/router';
// import routeConfig from './app/app-routing.module';
// import {
//   bootstrapApplication,
//   provideProtractorTestingSupport,
// } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));

// bootstrapApplication(AppComponent, {
//   providers: [provideProtractorTestingSupport(), provideRouter(routeConfig)],
// }).catch((err) => console.error(err));

import {
  bootstrapApplication,
  provideProtractorTestingSupport,
} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import routeConfig from './app/app-routing.module';

bootstrapApplication(AppComponent, {
  providers: [provideProtractorTestingSupport(), provideRouter(routeConfig)],
}).catch((err) => console.error(err));
