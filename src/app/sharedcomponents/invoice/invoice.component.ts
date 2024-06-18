import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { FileUploadModule } from 'primeng/fileupload';

import { ApiService } from '../../api.service';

import { VendorData, POData } from 'src/app/schema';
import { InvoicegridComponent } from '@shared/invoicegrid/invoicegrid.component';
import { InvoicepopupComponent } from '@shared/invoicepopup/invoicepopup.component';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    CommonModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TableModule,
    CheckboxModule,
    InvoicegridComponent,
    FileUploadModule,
    InvoicepopupComponent,
  ],
  providers: [DialogService],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  vendorData: VendorData[] = [];
  poData: POData[] = [];
  filteredPoData: POData[] = [];
  dialogRef: DynamicDialogRef | undefined;

  formGroup!: FormGroup;

  @ViewChild(InvoicegridComponent, { static: false })
  invoiceGridComponent!: InvoicegridComponent;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      selectVendor: new FormControl(null),
      invoice: new FormControl(null),
      invoiceAmount: new FormControl(0),
      invoiceDate: new FormControl(null),
      dueDate: new FormControl(null),
      remainingAllocation: new FormControl({ value: 0, disabled: true }),
      VendorPart: new FormControl(''),
    });

    this.getVendorData();

    // this.formGroup.get('selectVendor')?.valueChanges.subscribe((vendor) => {
    //   if (vendor) {
    //     this.getPOData(vendor);
    //   }
    // });

    this.getPOData({
      preferredVendor: 'AMERICAN SOCIETY OF ASSOCIATION EXECUTIVES',
    });

    this.formGroup
      .get('VendorPart')
      ?.valueChanges.subscribe((searchedVendorPartNo) => {
        this.filterPOData(searchedVendorPartNo);
      });
  }

  getVendorData() {
    const paramsvendor = {
      param1: 1088,
      param3: 'HIG',
    };

    this.apiService.getVendorData(paramsvendor).subscribe({
      next: (data) => {
        this.vendorData = data.map((item: VendorData) => ({
          preferredVendor: item.preferredVendor,
          vendorId: item.vendorId,
        }));
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        console.log('Vendor Data fetching completed.');
      },
    });
  }

  addNewPO() {
    this.router.navigate(['/newpo']);
  }

  getPOData(vendor: VendorData) {
    const paramsPO = {
      param1: 1088,
      param2: 1,
      param3: vendor?.preferredVendor,
      param4: '',
    };

    this.apiService.getPO(paramsPO).subscribe({
      next: (data) => {
        this.poData = data.map((item: POData, index: number) => ({
          ourRefNo: item.ourRefNo,
          expLineNo: item.expLineNo,
          polineseq: item.polineseq,
          deptCode: item.deptCode,
          accountCode: item.accountCode,
          expItem: item.expItem,
          account: item.accountCode + '-' + item.expItem,
          vendPartno: item.vendPartno,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          preAmount: item.preAmount,
          taxAmount1: item.taxAmount1 + item.taxAmount2 + item.taxAmount3,
          taxCalculated: item.taxCalculated,
          invQuantity: item.quantity,
          invUnitPrice: item.unitPrice,
          invAmount: item.preAmount,
          invTax: item.taxAmount1,
          shippingCost: item.shippingCost,
          invLineNo: index + 1,
          comments: item.comments,
          taxPercent: item.taxPercent,
        }));

        this.filteredPoData = this.poData;
        // console.log('poData', this.poData);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        console.log('PO Data fetching completed.');
      },
    });
  }

  filterPOData(vendPartno: string) {
    // console.log('poData', this.poData);
    // console.log('vendPartno', vendPartno, 'end');

    if (!vendPartno || vendPartno.trim() === '') {
      this.filteredPoData = this.poData;

      console.log('filteredPoData', this.filteredPoData);
    } else {
      const lowerCaseVendPartno = vendPartno.toLowerCase();

      this.filteredPoData = this.poData.filter((item) =>
        item.vendPartno.toLowerCase().startsWith(lowerCaseVendPartno)
      );
    }
    // console.log('filteredPoData', this.filteredPoData);
  }

  handleTotalInvAmountChange(totalInvAmount: number) {
    const invoiceAmount = this.formGroup.get('invoiceAmount')?.value;
    const remainingAllocation = (invoiceAmount - totalInvAmount).toFixed(2);
    this.formGroup
      .get('remainingAllocation')
      ?.setValue(remainingAllocation, { emitEvent: false });
  }

  setDueDate($event: any) {
    console.log('$event', $event);

    const invoiceDate = this.formGroup.get('invoiceDate')?.value;

    const dueDate = new Date(invoiceDate);
    dueDate.setMonth(dueDate.getMonth() + 1);

    const dueDateFormatted = dueDate.toLocaleDateString('en-CA');

    this.formGroup
      .get('dueDate')
      ?.setValue(dueDateFormatted, { emitEvent: false });
  }

  handleSave() {
    if (this.invoiceGridComponent) {
      this.invoiceGridComponent.handleSaveInGrid();
    } else {
      console.error('InvoicegridComponent is not available.');
    }
  }

  handleFormGroupData(formData: any[]) {
    const filteredFormData = formData.filter(
      (data) => data.invAmount < data.preAmount
    );

    if (filteredFormData.length > 0) {
      this.dialogRef = this.dialogService.open(InvoicepopupComponent, {
        header: 'Popup',
        width: '70%',
        height: '100%',
        data: {
          filteredFormData: filteredFormData,
        },
      });
    }
  }

  ngOnDestroy() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
