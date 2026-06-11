import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { Dashboard } from './components/dashboard/dashboard';
import { Transactions } from './components/transactions/transactions';
import { Categories } from './components/categories/categories';
import { Settings } from './components/settings/settings';

export const routes: Routes = [
  { path: '', component: Layout, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard },
    { path: 'transactions', component: Transactions },
    { path: 'categories', component: Categories },
    { path: 'settings', component: Settings },
  ]},
];
