import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
// import { AuthService } from '@api/auth/auth.service';

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
  activeUser: boolean = true;

  constructor(
    // private auth: AuthService,
    private router: Router
  ) {
    // this.activeUser = this.auth.activeUser;
  }

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
            // command: () => {
            //   this.router.navigate(['/mypos']);
            // },
          },
          {
            label: 'Chart of Accounts',
            icon: 'pi pi-fw pi-list',
          },
          {
            separator: true,
          },
          {
            label: 'Budget',
            icon: 'pi pi-fw pi-wallet',
          },
        ],
      },
      {
        label: 'Expenses',
        icon: 'pi pi-fw pi-dollar',
        items: [
          {
            label: 'New Expense',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/expense']);
            },
          },
          {
            label: 'My Expenses',
            icon: 'pi pi-fw pi-list',
          },
          {
            label: 'Drafts',
            icon: 'pi pi-fw pi-save',
          },
          {
            label: 'Receipt Store',
            icon: 'pi pi-fw pi-file-pdf',
          },
        ],
      },
      {
        label: 'Purchase Orders',
        icon: 'pi pi-fw pi-shopping-cart',
        items: [
          {
            label: 'New PO',
            icon: 'pi pi-fw pi-cart-plus',
            command: () => {
              this.router.navigate(['/po']);
            },
          },
          {
            label: 'My POs',
            icon: 'pi pi-fw pi-list',
            // command: () => {
            //   this.router.navigate(['/mypos']);
            // },
          },
          {
            label: 'Receive PO',
            icon: 'pi pi-fw pi-receipt',
            // command: () => {
            //   this.router.navigate(['/mypos']);
            // },
          },
        ],
      },
      {
        label: 'Approvals',
        icon: 'pi pi-fw pi-file-check',
        items: [
          {
            label: 'Manager Approvals',
            icon: 'pi pi-fw pi-file-check',
            command: () => {
              this.router.navigate(['/mgraproval']);
            },
          },
          {
            label: 'AP Approvals',
            icon: 'pi pi-fw pi-file-check',
            command: () => {
              this.router.navigate(['/mgraproval']);
            },
          },
          {
            label: 'Batches',
            icon: 'pi pi-fw pi-list-check',
          },
        ],
      },
      {
        label: 'Invoice',
        icon: 'pi pi-fw pi-receipt',
        items: [
          {
            label: 'New Invoice',
            icon: 'pi pi-fw pi-plus',
            command: () => {
              this.router.navigate(['/invoice']);
            },
          },
          {
            label: 'All Invoices',
            icon: 'pi pi-fw pi-list-check',
            // command: () => {
            //   this.router.navigate(['/mypos']);
            // },
          },
        ],
      },
      {
        label: 'Settings',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'My Profile',
            icon: 'pi pi-fw pi-user',
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
