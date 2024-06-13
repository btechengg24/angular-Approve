import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { POData } from 'src/app/schema';

@Component({
  selector: 'app-invoicegrid',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
  ],
  templateUrl: './invoicegrid.component.html',
  styleUrl: './invoicegrid.component.css',
})
export class InvoicegridComponent implements OnInit, OnChanges {
  @Input() poData: POData[] = [];

  formGroups: FormGroup[] = [];
  formGroup!: FormGroup;

  columns = [
    { field: 'checkBox', header: 'CheckBox' },
    { field: 'ourRefNo', header: 'PONo' },
    { field: 'expLineNo', header: 'Line' },
    { field: 'polineseq', header: 'Line Seq' },
    { field: 'deptCode', header: 'Department' },
    { field: 'account', header: 'Account' },
    { field: 'vendPartno', header: 'Vendor Part' },
    { field: 'quantity', header: 'Qty' },
    { field: 'unitPrice', header: 'Unit Price' },
    { field: 'preAmount', header: 'Line Amount' },
    { field: 'taxAmount1', header: 'Tax' },
    { field: 'taxCalculated', header: 'Taxable' },
    { field: 'invQuantity', header: 'Inv Qty' },
    { field: 'invUnitPrice', header: 'Inv Unit Price' },
    { field: 'invAmount', header: 'Inv Amount' },
    { field: 'invTax', header: 'Inv Tax' },
    { field: 'shippingCost', header: 'Ship Cost' },
    { field: 'invLineNo', header: 'Inv Line' },
    { field: 'comments', header: 'Comment' },
  ];
  ngOnInit() {
    this.initializeFormGroups();

    this.formGroup = new FormGroup({
      allChecked: new FormControl(false),
    });

    this.formGroup.get('allChecked')?.valueChanges.subscribe((value) => {
      this.toggleAllCheckboxes(value);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['poData'] && !changes['poData'].firstChange) {
      this.initializeFormGroups();
    }
  }

  initializeFormGroups() {
    this.formGroups = [];
    this.poData.forEach((item) => this.formGroupMapper(item));

    // console.log(this.formGroups);
  }

  formGroupMapper(gridRow: any) {
    const formGroup = new FormGroup({
      checkBox: new FormControl(false),
      poNo: new FormControl(gridRow.poNo),
      line: new FormControl(gridRow.line),
      lineSeq: new FormControl(gridRow.lineSeq),
      department: new FormControl(gridRow.department),
      vendorPart: new FormControl(gridRow.vendorPart),
      qty: new FormControl(gridRow.qty),
      unitPrice: new FormControl(gridRow.unitPrice),
      lineAmount: new FormControl(gridRow.lineAmount),
      tax: new FormControl(gridRow.tax),
      invQty: new FormControl(gridRow.invQty),
      invUnitPrice: new FormControl(gridRow.invUnitPrice),
      invAmount: new FormControl(gridRow.invAmount),
      invTax: new FormControl(gridRow.invTax),
      shipCost: new FormControl(gridRow.shipCost),
      invLine: new FormControl(gridRow.invLine),
      comment: new FormControl(gridRow.comment),
    });
    this.formGroups.push(formGroup);
  }

  toggleAllCheckboxes(value: boolean) {
    this.formGroups.forEach((formGroup) => {
      formGroup.get('checkBox')?.setValue(value, { emitEvent: false });
      // console.log("('checkBox')?.value", formGroup.get('checkBox')?.value);
    });
  }
}
