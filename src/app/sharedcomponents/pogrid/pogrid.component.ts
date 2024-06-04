import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

interface DepartmentData {
  codeKey?: string;
  description?: string;
  orgId?: string;
  codeId?: string;
  preferredVendor?: string;
  vendorId?: string;
}
interface AccountData {
  id?: number;
  accName?: string;
}
interface Row {
  Department: string;
  Account: string;
  VendorPart: string;
  Item: string;
  delDate: string;
  quantity: string;
  unitprice: string;
  totalprice: string;
}

@Component({
  selector: 'app-pogrid',
  standalone: true,
  imports: [CommonModule, TableModule, ReactiveFormsModule, DropdownModule],
  templateUrl: './pogrid.component.html',
  styleUrl: './pogrid.component.css',
})
export class PogridComponent implements OnInit, OnChanges {
  VendorPart: any[] = [
    { id: 1, value: 'VendorPart1' },
    { id: 2, value: 'VendorPart2' },
    { id: 3, value: 'VendorPart3' },
  ];

  @Input() gridRow: any = [];
  @Input() vendor: any;

  gridData: any[] = [];
  formGroups: FormGroup[] = [];
  departmentData: DepartmentData[] = [];
  onlyDepartment: DepartmentData[] = [];
  accountData: AccountData[] = [];

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

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getDeptData();
    // this.formGroupMapper();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['gridRow'] && !changes['gridRow'].isFirstChange()) {
      this.gridData.push(changes['gridRow'].currentValue);

      console.log('gridRow', this.gridRow);
      console.log('gridData', this.gridData);

      this.formGroupMapper(this.gridRow);

      console.log('formGroups', this.formGroups);
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
    const formGroup = this.formGroups[index];
    formGroup.enable();

    formGroup
      .get('Department')
      ?.valueChanges.subscribe((selectedDepartment) => {
        // console.log('this.formGroup 2', this.formGroup);
        // console.log('selectedDepartmentinside', selectedDepartment);

        const codeKey = selectedDepartment?.codeKey;

        const params2 = {
          param1: 1088,
          param2: 2,
          param3: 'HIG',
          param4: codeKey,
          param5: 'PO',
        };

        console.log('params2', params2);

        this.apiService.getAccData(params2).subscribe(
          (data) => {
            console.log('data', data);
            this.accountData = data.map((account: any, index: number) => ({
              id: index,
              accName: account.accName,
            }));

            console.log('accountData', this.accountData);
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );
      });

    formGroup.get('quantity')?.valueChanges.subscribe(() => {
      this.updateTotalPrice(formGroup);
    });

    formGroup.get('unitprice')?.valueChanges.subscribe(() => {
      this.updateTotalPrice(formGroup);
    });
    console.log('formGroups', this.formGroups);
  }

  deleteRow(index: number) {
    this.gridData.splice(index, 1);
    this.formGroups.splice(index, 1);

    console.log('formGroups', this.formGroups);
  }

  saveRow(index: number) {
    const formGroup = this.formGroups[index];
    formGroup.disable();

    this.updateTotalPrice(formGroup);

    console.log('formGroups', this.formGroups);
  }

  getDeptData() {
    const paramsacc = {
      param1: 1088,
      param3: 'DEPT',
      param4: 'ALL',
    };

    this.apiService.getDeptData(paramsacc).subscribe(
      (data) => {
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
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  updateTotalPrice(formGroup: FormGroup) {
    const quantity = formGroup.get('quantity')?.value || 0;
    const unitprice = formGroup.get('unitprice')?.value || 0;
    const totalprice = quantity * unitprice;
    formGroup.get('totalprice')?.setValue(totalprice, { emitEvent: false });
  }
}
