import { Routes } from '@angular/router';
import { SharedComponents } from './sharedcomponents/index';
import { Components } from './components/index';

export const routes: Routes = [
  {
    path: '',
    component: Components.AuthComponent,
  },
  {
    path: 'auth',
    component: Components.AuthComponent,
  },
  {
    path: 'po',
    component: Components.NewpoComponent,
  },
  {
    path: 'mypos',
    component: Components.MyposComponent,
  },
  {
    path: 'invoice',
    component: Components.InvoiceComponent,
  },
  {
    path: 'mgrappr',
    component: Components.MgrapprovalComponent,
  },
  {
    path: 'expense',
    component: Components.InvoicetotextComponent,
  },
];
