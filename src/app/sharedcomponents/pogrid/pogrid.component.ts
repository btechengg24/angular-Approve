import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Form,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { EntityService } from '@api/entity.service';
import { Paramify } from '@api/paramify';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { DepartmentData, AccountData, VendorPart, Row } from 'src/app/schema';

@Component({
  selector: 'app-pogrid',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
  ],
  templateUrl: './pogrid.component.html',
  styleUrl: './pogrid.component.css',
})
export class PogridComponent implements OnInit, OnChanges {
  @Input() gridRow: any = [];
  @Input() form: any;
  @Output() gridFormData = new EventEmitter<any[]>();

  gridData: any[] = [];
  formGroups: FormGroup[] = [];
  departmentData: DepartmentData[] = [];
  onlyDepartment: DepartmentData[] = [];
  accountData: AccountData[] = [];
  vendorPart: VendorPart[] = [];
  selectedAccount: any;
  selectedDepartment: any;
  editingIndex: number | null = null;

  columns = [
    { field: 'Department', header: 'Department' },
    { field: 'Account', header: 'Account' },
    { field: 'VendorPart', header: 'Vendor Part' },
    { field: 'Item', header: 'Item' },
    { field: 'delDate', header: 'Delivery Date' },
    { field: 'quantity', header: 'Quantity' },
    { field: 'unitprice', header: 'Unit Price' },
    { field: 'totalprice', header: 'Total Price' },
    { field: 'Actions', header: 'Actions' },
  ];

  constructor(
    private entityService: EntityService,
    private paramify: Paramify
  ) {}

  ngOnInit() {
    this.getDeptData();
    // console.log('form', this.form);

    if (this.form.selectVendor != null) {
      this.getVendorItemData(this.form.selectVendor);
    }
    // this.formGroupMapper();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['gridRow'] && !changes['gridRow'].isFirstChange()) {
      this.gridData.push(changes['gridRow'].currentValue);

      // console.log('gridRow', this.gridRow);
      console.log('gridData', this.gridData);

      this.formGroupMapper(this.gridRow);

      console.log('formGroups', this.formGroups);
    }
    if (changes['form'] && !changes['form'].isFirstChange()) {
      this.getVendorItemData(this.form?.selectVendor);
    }
  }

  formGroupMapper(gridRow: Row) {
    const formGroup = new FormGroup({
      Department: new FormControl({
        value: gridRow.Department,
        disabled: true,
      }),
      Account: new FormControl({ value: gridRow.Account, disabled: true }),
      VendorPart: new FormControl({
        value: gridRow.VendorPart,
        disabled: true,
      }),
      Item: new FormControl({ value: gridRow.Item, disabled: true }),
      delDate: new FormControl({ value: gridRow.delDate, disabled: true }),
      quantity: new FormControl({ value: gridRow.quantity, disabled: true }),
      unitprice: new FormControl({ value: gridRow.unitprice, disabled: true }),
      totalprice: new FormControl({
        value: gridRow.totalprice,
        disabled: true,
      }),
    });
    this.formGroups.push(formGroup);
  }

  editRow(index: number) {
    console.log('index', index);
    if (this.editingIndex !== null) return;

    this.editingIndex = index;

    const formGroup = this.formGroups[index];
    formGroup.enable();

    formGroup.get('totalprice')?.disable();

    // console.log('this.form?.selectvendor', this.form.selectVendor);

    formGroup.get('quantity')?.valueChanges.subscribe(() => {
      this.updateTotalPrice(formGroup);
    });

    formGroup.get('unitprice')?.valueChanges.subscribe(() => {
      this.updateTotalPrice(formGroup);
    });
    // console.log('formGroups', this.formGroups);
  }

  handleDepartmentChange(index: number, event: any) {
    // console.log('index', index);
    // console.log('event', event);

    const formGroup = this.formGroups[index];

    formGroup
      .get('Department')
      ?.valueChanges.subscribe((selectedDepartment) => {
        // console.log('selectedDepartmentinside', selectedDepartment);

        const codeKey = selectedDepartment?.codeKey;

        this.getAccData(codeKey);
      });
  }
  handleAccountChange(index: number, event: any) {
    // console.log('index', index);
    // console.log('event', event);

    const formGroup = this.formGroups[index];

    const account = formGroup.get('Account')?.value;

    // formGroup.get('Account')?.setValue(account, { emitEvent: false });
  }

  deleteRow(index: number) {
    console.log('index', index);

    this.gridData.splice(index, 1);
    this.formGroups.splice(index, 1);

    console.log('formGroups', this.formGroups);

    if (this.editingIndex === index) this.editingIndex = null;
    else if (this.editingIndex !== null && this.editingIndex > index)
      this.editingIndex--;
  }

  saveRow(index: number) {
    console.log('index', index);

    const formGroup = this.formGroups[index];
    const gridForm = [
      {
        ...formGroup.value,
        totalprice: formGroup.get('totalprice')?.value,
        index: index,
      },
    ];

    console.log('formGroup.value', formGroup.value);
    console.log('gridForm', gridForm);

    this.updateTotalPrice(formGroup);
    this.gridFormData.emit(gridForm);

    // console.log('formGroups', this.formGroups);

    // this.selectedDepartment = formGroup.get('Department')?.value;
    // this.selectedAccount = formGroup.get('Account')?.value;

    formGroup.disable();

    this.editingIndex = null;
  }

  updateTotalPrice(formGroup: FormGroup) {
    const quantity = formGroup.get('quantity')?.value || 0;
    const unitprice = formGroup.get('unitprice')?.value || 0;
    const totalprice = quantity * unitprice;
    formGroup.get('totalprice')?.setValue(totalprice, { emitEvent: false });
  }

  getDeptData() {
    this.entityService
      .callAPI$('getCodes', this.paramify.paramsdept)
      .subscribe({
        next: (data) => {
          // console.log('Data received:', data);

          this.departmentData = data.map((item: DepartmentData) => ({
            description: item.description,
            codeKey: item.codeKey,
            orgId: item.orgId,
            codeId: item.codeId,
          }));

          this.onlyDepartment = data.map(
            (item: DepartmentData, index: number) => ({
              id: index,
              codeKey: item.codeKey,
              description: item.description,
            })
          );

          // console.log('departmentData', this.departmentData);
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

  getAccData(codekey: any) {
    this.entityService
      .callAPI$('getExpItemsByDept', this.paramify.paramsacc(codekey))
      .subscribe({
        next: (data) => {
          // console.log('data', data);
          this.accountData = data.map((account: any, index: number) => ({
            id: index,
            accName: account.accName,
            accountCode: account.accountCode,
          }));

          // console.log('accountData', this.accountData);
        },

        error: (error) => {
          console.error('Error fetching data:', error);
        },

        complete: () => {
          console.log('Account Data fetching completed.');
        },
      });
  }

  getVendorItemData(vendor: any) {
    // console.log('vendor', vendor);

    this.entityService
      .callAPI$('getVendorItems', this.paramify.paramsvendoritem(vendor))
      .subscribe({
        next: (data) => {
          console.log('data', data);

          this.vendorPart = data.map((item: any) => ({
            vendPartDesc: item.vendPartDesc,
            itemId: item.itemID,
          }));

          // console.log('vendorPart', this.vendorPart);
        },

        error: (error) => {
          console.error('Error fetching data:', error);
        },

        complete: () => {
          console.log('Vendor Item Data fetching completed.');
        },
      });
  }

  handleSaveInHeader() {
    let gridData: any[] = [];
    this.formGroups.forEach((formGroup, index) => {
      console.log('form value', formGroup.value);

      // const formGroupValues: any = {};
      // Object.keys(formGroup.controls).forEach((key) => {
      //   formGroupValues[key] = formGroup.get(key)?.value;
      // });
      // formGroupValues[index] = index;

      gridData.push({ ...formGroup.value, index: index });
    });
    this.gridFormData.emit(gridData);
  }
}
