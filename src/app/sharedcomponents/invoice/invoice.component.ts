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

import { VendorData, POData } from 'src/app/schema';
import { InvoicegridComponent } from '@shared/invoicegrid/invoicegrid.component';
import { InvoicepopupComponent } from '@shared/invoicepopup/invoicepopup.component';
import { MenuComponent } from '@shared/menu/menu.component';

import { formatDate } from '@angular/common';

import { EntityService } from '@api/entity.service';
import { Paramify } from '@api/paramify';

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
    MenuComponent
  ],
  providers: [DialogService],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  vendorData: VendorData[] = [];
  poData: POData[] = [];
  filteredPoData: POData[] = [];
  totalInvAmount: number = 0;

  dialogRef: DynamicDialogRef | undefined;

  formGroup!: FormGroup;

  @ViewChild(InvoicegridComponent, { static: false })
  invoiceGridComponent!: InvoicegridComponent;

  constructor(
    private entityService: EntityService,
    private router: Router,
    private dialogService: DialogService,
    private paramify: Paramify
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      selectVendor: new FormControl(null),
      invoice: new FormControl(null),
      invoiceAmount: new FormControl(0),
      invoiceDate: new FormControl(null),
      dueDate: new FormControl(null),
      remainingAllocation: new FormControl({ value: 0.0, disabled: true }),
      VendorPart: new FormControl(''),
    });

    this.getVendorData();

    this.formGroup.get('selectVendor')?.valueChanges.subscribe((vendor) => {
      if (vendor) {
        this.getPOData(vendor);
      }
    });

    // this.getPOData({
    //   preferredVendor: 'AMERICAN SOCIETY OF ASSOCIATION EXECUTIVES',
    // });

    this.formGroup
      .get('VendorPart')
      ?.valueChanges.subscribe((searchedVendorPartNo) => {
        this.filterPOData(searchedVendorPartNo);
      });
  }

  getVendorData() {
    this.entityService
      .callAPI$('getPreferredVendors', this.paramify.paramsvendor)
      .subscribe({
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
    this.entityService
      .callAPI$(
        'getMultipleExpDetailsByReqId',
        this.paramify.paramsgetPO(vendor)
      )
      .subscribe({
        next: (data) => {
          this.poData = data.map((item: any, index: number) => ({
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

            reqId: item.reqId,
            qtyReceived: item.qtyReceived,
            cancelFlag: 0,
            poMasterFlag: item.masterFlag,
            poDetailsFlag: item.detailsFlag,
            packageUnit: item.packageUnit,
            itemCode: item.itemCode,
            lastUpdatedSource: item.lastUpdSource,
            poStartDate: item.startDate,
            poPurpose: item.purpose,
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

  filterPOData(searchTerm: string) {
    if (!searchTerm || searchTerm.trim() === '') {
      this.filteredPoData = this.poData;
    } else {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const isNumeric = !isNaN(Number(lowerCaseSearchTerm));

      this.filteredPoData = this.poData.filter((item) => {
        if (isNumeric) {
          return item.ourRefNo.toString().startsWith(lowerCaseSearchTerm);
        } else {
          return item.vendPartno.toLowerCase().startsWith(lowerCaseSearchTerm);
        }
      });
    }
  }

  handleTotalInvAmountChange(totalInvAmount: number) {
    this.totalInvAmount = totalInvAmount;

    const invoiceAmount = this.formGroup.get('invoiceAmount')?.value;
    const remainingAllocation = (invoiceAmount - totalInvAmount).toFixed(2);
    this.formGroup
      .get('remainingAllocation')
      ?.setValue(remainingAllocation, { emitEvent: false });
  }

  handleInvoiceAmountChange($event: any) {
    // console.log('event', $event);

    const invoiceAmount = +$event.target.value;
    // console.log('invoiceAmount', invoiceAmount);
    const remainingAllocation = (invoiceAmount - this.totalInvAmount).toFixed(
      2
    );
    // console.log('remainingAllocation', remainingAllocation);

    this.formGroup
      .get('remainingAllocation')
      ?.setValue(remainingAllocation, { emitEvent: false });
  }

  setDueDate($event: any) {
    // console.log('$event', $event);

    const invoiceDate = $event.target.value;

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
    const filteredFormData: any[] = [];
    const saveFormData: any[] = [];

    formData.map((data) => {
      if (data.invAmount < data.preAmount) {
        filteredFormData.push(data);
      } else {
        saveFormData.push(data);
      }
    });

    console.log('filteredFormData', filteredFormData);
    console.log('saveFormData', saveFormData);

    saveFormData.forEach((item) => {
      item.finalInvoice = false;
    });

    // console.log('saveFormData', saveFormData);

    if (filteredFormData.length > 0) {
      // console.log('if part');

      if (saveFormData.length > 0) this.handleActualSave(saveFormData);

      this.dialogRef = this.dialogService.open(InvoicepopupComponent, {
        header: 'Popup',
        width: '70%',
        height: '100%',
        data: {
          filteredFormData: filteredFormData,
        },
      });

      this.dialogRef.onClose.subscribe((returnedData) => {
        if (returnedData) {
          console.log('Returned Data from popup:', returnedData);

          this.handleActualSave(returnedData);
        }
      });
    } else {
      // console.log('else part');
      this.handleActualSave(formData);
    }
  }

  handleActualSave(gridForm: any[]) {
    console.log('gridForm in invoice', gridForm);

    const form = this.formGroup.value;
    console.log('form in invoice', form);

    const data = {
      form: form,
      gridForm: gridForm,
    };

    this.entityService
      .callAPI$('addPOInvoiceDetailsMul', this.paramify.paramssaveInvoice(data))
      .subscribe({
        next: (data) => {
          console.log('data', data);
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        },
        complete: () => {
          console.log('Saving Invoice completed.');
          this.refreshInvoiceGrid();
        },
      });
  }

  refreshInvoiceGrid() {
    this.getPOData(this.formGroup.get('selectVendor')?.value);
  }

  ngOnDestroy() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
