import { Routes } from '@angular/router';
import { SharedComponents } from './sharedcomponents/index';
import { Components } from './components/index';

export const routes: Routes = [
    {
        path: '', component: Components.AuthComponent
    },
    {
        path: 'auth', component: Components.AuthComponent
    }, 
    {
        path: 'newpo', component: Components.NewpoComponent
    }, 
    {
        path: 'mypos', component: Components.MyposComponent
    }, 
    {
        path: 'mgrappr', component: Components.MgrapprovalComponent
    }
];
