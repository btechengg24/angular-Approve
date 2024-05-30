import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ExpenseTypeOption } from 'src/app/schema';

@Component({
  selector: 'app-popopup',
  standalone: true,
  imports: [
    DynamicDialogModule,
    ReactiveFormsModule,
    CommonModule,
    CardModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
  ],
  templateUrl: './popopup.component.html',
  styleUrl: './popopup.component.css',
})
export class PopopupComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() saveFormData: EventEmitter<any> = new EventEmitter<any>();

  popupVisible: boolean = false;

  Department: ExpenseTypeOption[] = [
    { id: 1, value: 'Department1' },
    { id: 2, value: 'Department2' },
    { id: 3, value: 'Department3' },
  ];
  Account: ExpenseTypeOption[] = [
    { id: 1, value: 'Account1' },
    { id: 2, value: 'Account2' },
    { id: 3, value: 'Account3' },
  ];
  VendorPart: ExpenseTypeOption[] = [
    { id: 1, value: 'VendorPart1' },
    { id: 2, value: 'VendorPart2' },
    { id: 3, value: 'VendorPart3' },
  ];

  gridData: any = {};

  formGroup!: FormGroup;

  constructor(public ref: DynamicDialogRef) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      Department: new FormControl(this.Department[0]),
      Account: new FormControl(this.Account[0]),
      VendorPart: new FormControl(this.VendorPart[0]),
      Item: new FormControl(null),
      delDate: new FormControl(null),
      quantity: new FormControl(1),
      unitprice: new FormControl(0.0),
      totalprice: new FormControl(0.0),
    });

    this.formGroup.get('quantity')?.valueChanges.subscribe(() => {
      this.updateTotalPrice();
    });

    this.formGroup.get('unitprice')?.valueChanges.subscribe(() => {
      this.updateTotalPrice();
    });
  }

  updateTotalPrice() {
    const quantity = this.formGroup.get('quantity')?.value || 0;
    const unitprice = this.formGroup.get('unitprice')?.value || 0;
    const totalprice = quantity * unitprice;
    this.formGroup
      .get('totalprice')
      ?.setValue(totalprice, { emitEvent: false });
  }

  saveToGrid() {
    const formData = this.formGroup.getRawValue();
    this.gridData = formData;
    console.log('data in popopup', this.gridData);
    // this.formGroup.reset({
    //   Department: this.Department[0],
    //   Account: this.Account[0],
    //   VendorPart: this.VendorPart[0],
    //   Item: null,
    //   delDate: null,
    //   quantity: 1,
    //   unitprice: 0.0,
    //   totalprice: 0.0,
    // });

    this.saveFormData.emit(this.gridData);

    this.ref.close();
  }
}
