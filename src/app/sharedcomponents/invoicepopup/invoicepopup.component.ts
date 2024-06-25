import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
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

  @ViewChild(InvoicegridComponent, { static: false })
  invoiceGridComponent!: InvoicegridComponent;

  constructor(
    private config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.filteredFormData = [];
    this.reqFormData = [];

    this.filteredFormData = this.config.data.filteredFormData;

    console.log('filteredFormData', this.filteredFormData);

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

  handleSave() {
    if (this.invoiceGridComponent) {
      this.invoiceGridComponent.handleSaveInGrid();
    } else {
      console.error('InvoicegridComponent is not available.');
    }
  }

  handleFormGroupData(formData: any[]) {
    console.log('formData in popup', formData);

    this.dialogRef.close(formData);
  }
}
