import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';

import { ExpenseTypeOption, VendorData } from 'src/app/schema';

import { ApiService } from '../../api.service';

import { PogridComponent } from '@shared/pogrid/pogrid.component';
// import { PopopupComponent } from '@shared/popopup/popopup.component';

@Component({
  selector: 'app-poheader',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    CommonModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    PogridComponent,
    // PopopupComponent
  ],
  providers: [DialogService],
  templateUrl: './poheader.component.html',
  styleUrl: './poheader.component.css',
})
export class PoheaderComponent implements OnInit {
  ExpenseType: ExpenseTypeOption[] = [
    { id: 1, value: 'Expense Request' },
    { id: 2, value: 'Pre-Approval' },
    { id: 3, value: 'Purchase Order' },
  ];
  // Vendors: ExpenseTypeOption[] = [
  //   { id: 1, value: 'Vendor1' },
  //   { id: 2, value: 'Vendor2' },
  //   { id: 3, value: 'Vendor3' },
  // ];
  Managers: ExpenseTypeOption[] = [
    { id: 1, value: 'Manager1@gmail.com' },
    { id: 2, value: 'Manager2@gmail.com' },
    { id: 3, value: 'Manager3@gmail.com' },
  ];

  formGroup!: FormGroup;

  // gridData: any[] = [];
  gridRow: any = [];
  vendorData: VendorData[] = [];

  expenseType: ExpenseTypeOption | null = null;
  startDate: Date = new Date();
  selectedVendor: ExpenseTypeOption | null = null;
  purpose: string = '';
  managerEmail: string = '';
  emailCC: string = '';
  i: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      expenseType: new FormControl(this.ExpenseType[0]),
      startDate: new FormControl(null),
      selectVendor: new FormControl(null),
      purpose: new FormControl(null),
      managerEmail: new FormControl(this.Managers[0]),
      emailCC: new FormControl(null),
    });

    this.getVendorData();
  }

  getVendorData() {
    const paramsvendor = {
      param1: 1088,
      param3: 'HIG',
    };

    this.apiService.getVendorData(paramsvendor).subscribe({
      next: (data) => {
        this.vendorData = data.map((item: VendorData) => ({
          preferredVendor: item.preferredVendor,
          vendorId: item.vendorId,
        }));

        // console.log('vendorData', this.vendorData);
      },

      error: (error) => {
        console.error('Error fetching data:', error);
      },

      complete: () => {
        console.log('Vendor Data fetching completed.');
      },
    });
  }
  // constructor(private dialogService: DialogService) {}

  showDialog() {
    console.log('i', this.i);

    const newPO = {
      Department: '',
      Account: '',
      VendorPart: '',
      Item: '',
      delDate: '',
      quantity: this.i,
      unitprice: '',
      totalprice: '',
    };
    this.i++;

    // this.gridData.push(newPO);
    // console.log('gridData', this.gridData);

    this.gridRow = newPO;
    console.log('gridRow', this.gridRow);
  }

  // showDialog() {
  //   const ref = this.dialogService.open(PopopupComponent, {
  //     header: 'Popup',
  //     width: '70%',
  //     height: '100%',
  //   });
  // }
}
