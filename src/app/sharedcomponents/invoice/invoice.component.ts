import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';

import { ApiService } from '../../api.service';

import { VendorData } from 'src/app/schema';

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
  ],
  providers: [DialogService],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css',
})
export class InvoiceComponent implements OnInit {
  vendorData: VendorData[] = [];

  formGroup!: FormGroup;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      selectVendor: new FormControl(null),
      invoice: new FormControl(null),
      invoiceAmount: new FormControl(null),
      invoiceDate: new FormControl(null),
      dueDate: new FormControl(null),
      remainingAllocation: new FormControl({ value: 0, disabled: true }),
    });

    this.getVendorData();
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

        // console.log('vendorData', this.vendorData);
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
}
