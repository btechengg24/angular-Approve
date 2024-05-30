import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../api.service';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

interface DepartmentData {
  codeKey: string;
  description: string;
  orgId?: string;
  codeId: string;
}

@Component({
  selector: 'app-pogrid',
  standalone: true,
  imports: [CommonModule, TableModule, ReactiveFormsModule, DropdownModule],
  templateUrl: './pogrid.component.html',
  styleUrl: './pogrid.component.css',
})
export class PogridComponent implements OnInit {
  @Input() gridData: any[] = [];
  formGroups: FormGroup[] = [];
  departmentData: DepartmentData[] = [];
  onlyDepartment: DepartmentData[] = [];

  columns = [
    { field: 'Department', header: 'Department' },
    { field: 'Account', header: 'Account' },
    { field: 'VendorPart', header: 'Vendor Part' },
    { field: 'Item', header: 'Item' },
    { field: 'delDate', header: 'Delivery Date' },
    { field: 'quantity', header: 'Quantity' },
    { field: 'unitprice', header: 'Unit Price' },
    { field: 'totalprice', header: 'Total Price' },
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.gridData.forEach((item) => {
      const formGroup = new FormGroup({
        Department: new FormControl(item.Department),
        Account: new FormControl(item.Account),
        VendorPart: new FormControl(item.VendorPart),
        Item: new FormControl(item.Item),
        delDate: new FormControl(item.delDate),
        quantity: new FormControl(item.quantity),
        unitprice: new FormControl(item.unitprice),
        totalprice: new FormControl(item.totalprice),
      });
      this.formGroups.push(formGroup);
    });

    const params1 = {
      param1: 1088,
      param3: 'DEPT',
      param4: 'ALL',
      // email: '2021ugec078@nitjsr.ac.in',
    };

    this.apiService.getAccData(params1).subscribe(
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

        console.log('departmentData', this.departmentData);
        console.log('onlyDepartment', this.onlyDepartment);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
