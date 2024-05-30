import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-pogrid',
  standalone: true,
  imports: [CommonModule, TableModule, ReactiveFormsModule],
  templateUrl: './pogrid.component.html',
  styleUrl: './pogrid.component.css',
})
export class PogridComponent implements OnInit {
  @Input() gridData: any[] = [];
  formGroups: FormGroup[] = [];

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
  }
}
