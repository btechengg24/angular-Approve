import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { EntityService } from '@api/entity.service';
import { Paramify } from '@api/paramify';

import { POData, DepartmentData } from 'src/app/schema';

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
    DropdownModule,
    ToggleButtonModule,
  ],
  templateUrl: './invoicegrid.component.html',
  styleUrl: './invoicegrid.component.css',
})
export class InvoicegridComponent implements OnInit, OnChanges {
  @Input() poData: POData[] = [];
  @Input() mini: boolean = false;
  @Output() totalInvAmountChange = new EventEmitter<number>();
  @Output() formGroupData = new EventEmitter<FormGroup[]>();

  onlyDepartment: DepartmentData[] = [];
  totalInvAmount: number = 0;

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

  miniColumns = [
    { field: 'ourRefNo', header: 'PONo' },
    { field: 'expLineNo', header: 'Line' },
    { field: 'deptCode', header: 'Dept.' },
    { field: 'account', header: 'Account' },
    { field: 'vendPartno', header: 'Vendor Part' },
    { field: 'preAmount', header: 'PO Amt' },
    { field: 'invQuantity', header: 'Inv Qty' },
    { field: 'invUnitPrice', header: 'Inv Unit Price' },
    { field: 'invAmount', header: 'Inv Amt' },
    { field: 'invTax', header: 'Inv Tax' },
    { field: 'shippingCost', header: 'Ship Cost' },
    { field: 'finalInvoice', header: 'Final Invoice?' },
  ];

  constructor(
    private entityService: EntityService,
    private paramify: Paramify
  ) {}

  ngOnInit() {
    this.initializeFormGroups();
    this.getDeptData();

    this.formGroup = new FormGroup({
      checkBox: new FormControl(false),
    });

    // this.formGroup.get('checkBox')?.valueChanges.subscribe((value) => {
    //   this.toggleAllCheckboxes(value);
    // });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['poData'] && !changes['poData'].firstChange) {
      // console.log('poData', this.poData);
      this.initializeFormGroups();
    }
  }

  initializeFormGroups() {
    this.formGroups = [];
    this.poData.forEach((item) => this.formGroupMapper(item));

    console.log('poData in grid', this.poData);
  }

  formGroupMapper(gridRow: POData) {
    const formGroup = new FormGroup({
      checkBox: new FormControl(false),
      ourRefNo: new FormControl(gridRow.ourRefNo),
      expLineNo: new FormControl(gridRow.expLineNo),
      polineseq: new FormControl(gridRow.polineseq),
      deptCode: new FormControl(gridRow.deptCode),
      account: new FormControl(gridRow.account),
      vendPartno: new FormControl(gridRow.vendPartno),
      quantity: new FormControl(gridRow.quantity),
      unitPrice: new FormControl(gridRow.unitPrice),
      preAmount: new FormControl(gridRow.preAmount),
      taxAmount1: new FormControl(gridRow.taxAmount1),
      taxCalculated: new FormControl(gridRow.taxCalculated),
      invQuantity: new FormControl(gridRow.invQuantity),
      invUnitPrice: new FormControl(gridRow.invUnitPrice),
      invAmount: new FormControl({ value: gridRow.invAmount, disabled: true }),
      invTax: new FormControl({
        value: gridRow.invTax,
        disabled: gridRow.taxCalculated ? false : true,
      }),
      shippingCost: new FormControl(gridRow.shippingCost),
      invLineNo: new FormControl(gridRow.invLineNo),
      comments: new FormControl(gridRow.comments),
      finalInvoice: new FormControl(true),
    });
    if (this.mini === true) {
      formGroup.disable();
      formGroup.controls.finalInvoice.enable();
    }

    this.formGroups.push(formGroup);
  }

  toggleAllCheckboxes($event: any) {
    // console.log('event', $event);
    const value = $event.target.checked;

    this.formGroups.forEach((formGroup) => {
      formGroup.get('checkBox')?.setValue(value, { emitEvent: false });
      // console.log("('checkBox')?.value", formGroup.get('checkBox')?.value);
    });
    this.totalInvAmount = this.calculateTotalInvAmount();
    this.totalInvAmountChange.emit(this.totalInvAmount);
  }

  getDeptData() {
    this.entityService
      .callAPI$('getCodes', this.paramify.paramsdept)
      .subscribe({
        next: (data) => {
          // console.log('Data received:', data);

          this.onlyDepartment = data.map(
            (item: DepartmentData, index: number) => ({
              id: index,
              codeKey: item.codeKey,
              description: item.description,
            })
          );

          // console.log('onlyDepartment', this.onlyDepartment);
        },

        error: (error) => {
          console.error('Error fetching data:', error);
        },

        complete: () => {
          console.log('Department Data fetching completed.');
        },
      });
  }

  calculateTotalInvAmount(): number {
    let total = 0;
    this.formGroups.forEach((formGroup) => {
      if (formGroup.get('checkBox')?.value) {
        total += formGroup.get('invAmount')?.value || 0;
      }
    });
    return total;
  }

  checkBoxChanged(index?: number, $event?: any) {
    const isChecked = $event.target.checked;

    if (index != undefined) {
      const invAmount = this.formGroups[index].get('invAmount')?.value;

      // console.log(this.formGroups[index]);
      // console.log('invAmount', invAmount);

      this.totalInvAmount += isChecked ? +invAmount : -invAmount;
    }

    this.totalInvAmountChange.emit(this.totalInvAmount);

    // console.log(
    //   'totalInvAmount',
    //   this.totalInvAmount,
    //   this.calculateTotalInvAmount()
    // );
  }

  invDetailsChanged(index?: number, $event?: any) {
    // console.log('$event', $event);

    if (index != undefined) {
      // this.invTaxChanges(index);

      const formGroup = this.formGroups[index];

      const taxCalculated = +formGroup.get('taxCalculated')?.value;

      this.invAmountReflectionOfChanges(index, taxCalculated);

      // console.log(
      //   'invDetails',
      //   taxCalculated,
      //   invQuantity,
      //   invUnitPrice,
      //   invTax,
      //   shippingCost,
      //   invAmount
      // );

      // console.log(
      //   'invDetails1',
      //   typeof taxCalculated,
      //   typeof invQuantity,
      //   typeof invUnitPrice,
      //   typeof invTax,
      //   typeof shippingCost,
      //   typeof invAmount
      // );

      this.totalInvAmount = this.calculateTotalInvAmount();
      this.totalInvAmountChange.emit(this.totalInvAmount);
    }
  }

  invTaxChanged(index?: number, $event?: any) {
    // console.log('$event', $event);

    if (index != undefined) {
      const formGroup = this.formGroups[index];

      const invQuantity = +formGroup.get('invQuantity')?.value;
      const invUnitPrice = +formGroup.get('invUnitPrice')?.value;
      const invTax = +$event.target.value;
      const shippingCost = +formGroup.get('shippingCost')?.value;

      const invAmount = invQuantity * invUnitPrice + invTax + shippingCost;

      formGroup.get('invAmount')?.setValue(invAmount, { emitEvent: false });

      this.totalInvAmount = this.calculateTotalInvAmount();
      this.totalInvAmountChange.emit(this.totalInvAmount);
    }
  }

  taxableChanged(index?: number, $event?: any) {
    const isChecked = +$event.target.checked;

    if (index != undefined) {
      const formGroup = this.formGroups[index];

      const invTaxControl = formGroup.get('invTax');
      if (invTaxControl) {
        if (isChecked) {
          invTaxControl.enable();
        } else {
          invTaxControl.disable();
        }
      }

      this.invAmountReflectionOfChanges(index, isChecked);

      this.totalInvAmount = this.calculateTotalInvAmount();
      this.totalInvAmountChange.emit(this.totalInvAmount);
    }
  }

  invAmountReflectionOfChanges(index: number, taxCalculated: number) {
    const formGroup = this.formGroups[index];

    const invQuantity = +formGroup.get('invQuantity')?.value;
    const invUnitPrice = +formGroup.get('invUnitPrice')?.value;
    const shippingCost = +formGroup.get('shippingCost')?.value;

    if (!taxCalculated) {
      formGroup.get('invTax')?.setValue(0, { emitEvent: false });

      const invAmount = invQuantity * invUnitPrice + 0 + shippingCost;

      formGroup.get('invAmount')?.setValue(invAmount, { emitEvent: false });
    } else {
      const taxPercent = this.poData[index].taxPercent;

      // console.log('taxPercent', taxPercent);

      const invQuantity = +formGroup.get('invQuantity')?.value;
      const invUnitPrice = +formGroup.get('invUnitPrice')?.value;

      const invTax = +(
        (taxPercent / 100) *
        (invQuantity * invUnitPrice + shippingCost)
      ).toFixed(2);

      formGroup.get('invTax')?.setValue(invTax, { emitEvent: false });

      const invAmount = invQuantity * invUnitPrice + invTax + shippingCost;

      formGroup.get('invAmount')?.setValue(invAmount, { emitEvent: false });
    }
  }

  handleSaveInGrid() {
    // console.log('formGroups', this.formGroups);
    let formData: any[] = [];

    if (this.mini) {
      this.formGroups.forEach((formGroup, index) => {
        console.log('form value', formGroup.value);

        // const formGroupValues: any = {};
        // Object.keys(formGroup.controls).forEach((key) => {
        //   formGroupValues[key] = formGroup.get(key)?.value;
        // });

        const originalPOData = this.poData[index];

        formData.push({ ...originalPOData, ...formGroup.value });
      });
    } else {
      this.formGroups.forEach((formGroup, index) => {
        console.log('form value', formGroup.value);

        if (formGroup.value.checkBox === true) {
          // const formGroupValues: any = {};
          // Object.keys(formGroup.controls).forEach((key) => {
          //   formGroupValues[key] = formGroup.get(key)?.value;
          // });

          const originalPOData = this.poData[index];

          formData.push({ ...originalPOData, ...formGroup.value });
        }
      });
    }

    console.log('formData in grid', formData);
    this.formGroupData.emit(formData);
  }
}
