import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'landing',
        loadChildren: () => import('../landing/landing.module').then(m => m.LandingPageModule)
      },
      {
        path: 'view-event/:id',
        loadChildren: () => import('../landing/view-event/view-event.module').then(m => m.ViewEventPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../profile/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'stats',
        loadChildren: () => import('../stats/stats.module').then( m => m.StatsPageModule)
      },
     
      {
        path: '',
        redirectTo: '/tabs/landing',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
