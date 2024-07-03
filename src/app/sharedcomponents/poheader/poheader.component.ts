import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';

import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';

import { ExpenseTypeOption, VendorData } from 'src/app/schema';

import { EntityService } from '@api/entity.service';
import { Paramify } from '@api/paramify';

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
  Managers: ExpenseTypeOption[] = [
    { id: 1, value: 'Manager1@gmail.com' },
    { id: 2, value: 'Manager2@gmail.com' },
    { id: 3, value: 'Manager3@gmail.com' },
  ];

  formGroup!: FormGroup;

  gridData: any[] = [];
  gridRow: any = [];
  vendorData: VendorData[] = [];

  expenseType: ExpenseTypeOption | null = null;
  startDate: Date = new Date();
  purpose: string = '';
  managerEmail: string = '';
  emailCC: string = '';
  i: number = 0;
  reqID: number | null = 3033;

  @ViewChild(PogridComponent, { static: false })
  pogridComponent!: PogridComponent;

  constructor(
    private entityService: EntityService,
    private paramify: Paramify
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      expenseType: new FormControl(this.ExpenseType[2]),
      startDate: new FormControl(null),
      selectVendor: new FormControl(null),
      purpose: new FormControl(null),
      managerEmail: new FormControl(this.Managers[0]),
      emailCC: new FormControl(''),
    });

    this.getVendorData();
  }

  getVendorData() {
    this.entityService
      .callAPI$('getPreferredVendors', this.paramify.paramsvendor)
      .subscribe({
        next: (data) => {
          this.vendorData = data.map((item: VendorData) => ({
            preferredVendor: item.preferredVendor,
            vendorId: item.vendorId,
          }));

          // console.log('vendorData', this.vendorData);
        },

        error: (error) => {
          console.error('Error fetching Vendor Data:', error);
        },

        complete: () => {
          console.log('Vendor Data fetching completed.');
        },
      });
  }

  showDialog() {
    // console.log('i', this.i);

    const newPO = {
      Department: '',
      Account: '',
      VendorPart: '',
      Item: '',
      delDate: '',
      quantity: this.i,
      unitprice: 0,
      totalprice: 0,
    };
    this.i++;

    // this.gridData.push(newPO);
    // console.log('gridData', this.gridData);

    this.gridRow = newPO;
    // console.log('gridRow', this.gridRow);
  }

  // constructor(private dialogService: DialogService) {}
  // showDialog() {
  //   const ref = this.dialogService.open(PopopupComponent, {
  //     header: 'Popup',
  //     width: '70%',
  //     height: '100%',
  //   });
  // }

  onSave() {
    if (this.pogridComponent) {
      this.pogridComponent.handleSaveInHeader();
    } else {
      console.error('PogridComponent is not available.');
    }
  }

  getRequestId(form: any, gridForm: any) {
    let reqID: number;

    this.entityService
      .callAPI$('getCodes', this.paramify.paramsrequest)
      .subscribe({
        next: (data) => {
          // console.log('data', data);
          reqID = data[0].codeValue1;
          this.reqID = reqID;
          console.log('reqID', reqID);
          this.savePO(reqID, form, gridForm);
        },

        error: (error) => {
          console.error('Error fetching data:', error);
        },

        complete: () => {
          console.log('Req ID fetching completed.');
        },
      });
  }

  savePO(reqID: number, form: any, gridForm: any) {
    console.log('reqID', reqID);
    // console.log('form', form);
    // console.log('gridForm', gridForm);

    // const mockform = {
    //   emailCC: '',
    //   expenseType: { id: 3, value: 'Purchase Order' },
    //   managerEmail: { id: 1, value: 'Manager1@gmail.com' },
    //   purpose: 'p',
    //   selectVendor: {
    //     preferredVendor: 'AMERICAN HOTEL REGISTER COMPANY',
    //     vendorId: '6357',
    //   },
    //   startDate: '2024-07-01',
    // };
    // const mockgridForm = [
    //   {
    //     Account: {
    //       id: 3,
    //       accName: 'Bank Charges',
    //       accountCode: '526165000.000',
    //     },
    //     Department: { id: 0, codeKey: 'A&G', description: 'A&G Department' },
    //     Item: 'i',
    //     VendorPart: { vendPartDesc: 'Testing Vendor', itemId: 13012 },
    //     delDate: '2024-07-01',
    //     quantity: '2',
    //     totalprice: 6,
    //     unitprice: '3',
    //     index: 0,
    //   },
    //   // {
    //   //   Account: {
    //   //     id: 3,
    //   //     accName: 'Bank Charges',
    //   //     accountCode: '526165000.000',
    //   //   },
    //   //   Department: { id: 0, codeKey: 'A&G', description: 'A&G Department' },
    //   //   Item: 'i',
    //   //   VendorPart: { vendPartDesc: 'Testing Vendor', itemId: 13012 },
    //   //   delDate: '2024-07-01',
    //   //   quantity: '4',
    //   //   totalprice: 20,
    //   //   unitprice: '5',
    //   //   index:1
    //   // },
    // ];

    // console.log('mockform', mockform);
    // console.log('mockgridForm', mockgridForm);

    const data = {
      reqID: reqID,
      form: form,
      gridForm: gridForm,
    };
    // console.log('data', data);

    // console.log(this.paramify.paramssavePO(data));

    this.entityService
      .callAPI$('addExpense', this.paramify.paramssavePO(data))
      .subscribe({
        next: (data) => {
          console.log('data', data);
        },

        error: (error) => {
          console.error('Error fetching data:', error);
        },

        complete: () => {
          console.log('Save PO Data fetching completed.');
        },
      });
  }

  handleGridData(event: any) {
    console.log('event', event);

    const form = this.formGroup.value;
    // console.log('form in po header', form);

    console.log('reqID', this.reqID);
    if (this.reqID === null) this.getRequestId(form, event);
    else this.savePO(this.reqID, form, event);
    // this.savePO(2991, form, event);
  }
}
