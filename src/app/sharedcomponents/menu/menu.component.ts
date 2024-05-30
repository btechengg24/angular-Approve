import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { EntityService } from '@api/entity.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenubarModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  uFirstName: string = 'Rajesh';
  uLastName: string = 'Vemunoori';
  items: MenuItem[] | undefined;
  activeUser: boolean = false;
  constructor() {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.items = [
      {
        label: 'Admin',
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: 'Users',
            icon: 'pi pi-fw pi-plus',
          },
          {
            label: 'Chart of Accounts',
            icon: 'pi pi-fw pi-trash',
          },
          {
            separator: true,
          },
          {
            label: 'Budget',
            icon: 'pi pi-fw pi-external-link',
          },
        ],
      },
      {
        label: 'Expenses',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'New Expense',
            icon: 'pi pi-fw pi-align-left',
          },
          {
            label: 'My Expenses',
            icon: 'pi pi-fw pi-align-right',
          },
          {
            label: 'Drafts',
            icon: 'pi pi-fw pi-align-center',
          },
          {
            label: 'Receipt Store',
            icon: 'pi pi-fw pi-align-justify',
          },
        ],
      },
      {
        label: 'Purchase Orders',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'New PO',
            icon: 'pi pi-fw pi-user-plus',
          },
          {
            label: 'My POs',
            icon: 'pi pi-fw pi-user-minus',
          },
          {
            label: 'Receive PO',
            icon: 'pi pi-fw pi-users',
          },
        ],
      },
      {
        label: 'Approvals',
        icon: 'pi pi-fw pi-calendar',
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
        icon: 'pi pi-fw pi-power-off',
        items: [
          {
            label: 'New Invoice',
            icon: 'pi pi-fw pi-pencil',
          },
          {
            label: 'All Invoices',
            icon: 'pi pi-fw pi-calendar-times',
          },
        ],
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-power-off',
        items: [
          {
            label: 'My Profile',
            icon: 'pi pi-fw pi-pencil',
          },
          {
            label: 'Sign Out',
            icon: 'pi pi-fw pi-calendar-times',
          },
        ],
      },
    ];
  }
}
