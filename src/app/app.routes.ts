// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LocationMapComponent } from './pages/location-map/location-map.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'landing',
    component: LandingPageComponent,
  },
  {
    path: 'locations',
    component: LocationMapComponent,
  },
  {
    path: 'dashboard/:locationId',
    component: DashboardComponent,
  },
  {
    path: 'products',
    component: ProductPageComponent,
  },
  {
    path: '**',
    redirectTo: 'landing',
  },
];
