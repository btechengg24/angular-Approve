import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntityService } from '@api/entity.service';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MenubarModule,
    TieredMenuModule,
    CommonModule,
    SidebarModule,
    ButtonModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.items = [
      {
        label: 'Admin',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Users',
            icon: 'pi pi-fw pi-users',
          },
          {
            label: 'Chart of Accounts',
            icon: 'pi pi-fw pi-address-book',
          },
          {
            separator: true,
          },
          {
            label: 'Budget',
            icon: 'pi pi-fw pi-book',
          },
        ],
      },
      {
        label: 'Expenses',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'New Expense',
            icon: 'pi pi-fw pi-plus-circle',
          },
          {
            label: 'My Expenses',
            icon: 'pi pi-fw pi-book',
          },
          {
            label: 'Drafts',
            icon: 'pi pi-fw pi-file-edit',
          },
          {
            label: 'Receipt Store',
            icon: 'pi pi-fw pi-receipt',
          },
        ],
      },
      {
        label: 'Purchase Orders',
        icon: 'pi pi-fw pi-shopping-cart',
        items: [
          {
            label: 'New PO',
            icon: 'pi pi-fw pi-plus-circle',
            routerLink: ['/newpo'],
          },
          {
            label: 'My POs',
            icon: 'pi pi-fw pi-book',
          },
          {
            label: 'Received PO',
            icon: 'pi pi-fw pi-list',
          },
        ],
      },
      {
        label: 'Approvals',
        icon: 'pi pi-fw pi-check-square',
        items: [
          {
            label: 'Manager Approvals',
            icon: 'pi pi-fw pi-pencil',
          },
          {
            label: 'AP Approvals',
            icon: 'pi pi-fw pi-calendar-times',
          },
          {
            label: 'Batches',
            icon: 'pi pi-fw pi-calendar-times',
          },
        ],
      },
      {
        label: 'Invoicing',
        icon: 'pi pi-fw pi-calendar',
        items: [
          {
            label: 'New Invoice',
            icon: 'pi pi-fw pi-pencil',
            routerLink: ['/invoice'],
          },
          {
            label: 'All Invoices',
            icon: 'pi pi-fw pi-calendar-clock',
          },
        ],
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'My Profile',
            icon: 'pi pi-fw pi-user-edit',
          },
          {
            label: 'Sign Out',
            icon: 'pi pi-fw pi-sign-out',
          },
        ],
      },
    ];
  }
}
