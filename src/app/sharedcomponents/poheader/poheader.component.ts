import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';

import { ExpenseTypeOption } from 'src/app/schema';

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
  Vendors: ExpenseTypeOption[] = [
    { id: 1, value: 'Vendor1' },
    { id: 2, value: 'Vendor2' },
    { id: 3, value: 'Vendor3' },
  ];
  Managers: ExpenseTypeOption[] = [
    { id: 1, value: 'Manager1@gmail.com' },
    { id: 2, value: 'Manager2@gmail.com' },
    { id: 3, value: 'Manager3@gmail.com' },
  ];

  formGroup!: FormGroup;

  gridData: any[] = [];
  i: number = 0;

  ngOnInit() {
    this.formGroup = new FormGroup({
      expenseType: new FormControl(this.ExpenseType[0]),
      startDate: new FormControl(null),
      selectDate: new FormControl(null),
      selectVendor: new FormControl(null),
      purpose: new FormControl(null),
      managerEmail: new FormControl(this.Managers[0]),
      emailCC: new FormControl(null),
    });
  }

  // constructor(private dialogService: DialogService) {}

  showDialog() {
    console.log('i', this.i);

    const newPO = {
      Department: 'dept',
      Account: 'acc',
      VendorPart: 'vend',
      Item: 'ite',
      delDate: 'date',
      quantity: this.i,
      unitprice: '0',
      totalprice: '0',
    };
    this.gridData.push(newPO);

    this.i++;
    console.log('gridData', this.gridData);
  }

  // showDialog() {
  //   const ref = this.dialogService.open(PopopupComponent, {
  //     header: 'Popup',
  //     width: '70%',
  //     height: '100%',
  //   });
  // }
}
