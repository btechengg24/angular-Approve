import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';

import { InvoicegridComponent } from '@shared/invoicegrid/invoicegrid.component';

@Component({
  selector: 'app-invoicepopup',
  standalone: true,
  imports: [CommonModule, InvoicegridComponent, ButtonModule],
  templateUrl: './invoicepopup.component.html',
  styleUrl: './invoicepopup.component.css',
})
export class InvoicepopupComponent implements OnInit {
  filteredFormData: any[] = [];
  reqFormData: any[] = [];

  constructor(public config: DynamicDialogConfig) {}

  ngOnInit() {
    this.filteredFormData = this.config.data.filteredFormData;

    this.reqFormData = this.filteredFormData.map((item) => ({
      ourRefNo: item.ourRefNo,
      expLineNo: item.expLineNo,
      polineseq: item.polineseq,
      deptCode: item.deptCode,
      // accountCode: item.accountCode,
      // expItem: item.expItem,
      account: item.account,
      vendPartno: item.vendPartno,
      invQuantity: item.quantity,
      invUnitPrice: item.unitPrice,
      invAmount: item.invAmount,
      invTax: item.invTax,
      shippingCost: item.shippingCost,
    }));
  }
  onSave() {
    console.log('saved');
  }
}
