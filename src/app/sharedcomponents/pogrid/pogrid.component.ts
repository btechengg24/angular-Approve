import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Form,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../api.service';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

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
  acccountCode: string;
}
interface VendorPart {
  vendPartDesc?: string;
  itemId?: number;
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

  gridData: any[] = [];
  formGroups: FormGroup[] = [];
  departmentData: DepartmentData[] = [];
  onlyDepartment: DepartmentData[] = [];
  accountData: AccountData[] = [];
  vendorPart: VendorPart[] = [];
  selectedAccount: any;
  selectedDepartment: any;

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
    if (changes['form'] && !changes['form'].isFirstChange()) {
      console.log('formvalue', this.form);
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

    // console.log('this.form?.selectvendor', this.form.selectVendor);
    this.getVendorItemData(this.form?.selectVendor);

    formGroup
      .get('Department')
      ?.valueChanges.subscribe((selectedDepartment) => {
        // console.log('selectedDepartmentinside', selectedDepartment);

        const codeKey = selectedDepartment?.codeKey;

        this.getAccData(codeKey);
      });

    this;
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
    const gridForm = formGroup.value;

    console.log('gridForm', gridForm);

    this.updateTotalPrice(formGroup);

    console.log('formGroups', this.formGroups);

    this.selectedDepartment = formGroup.get('Department')?.value;
    this.selectedAccount = formGroup.get('Account')?.value;
    this.getRequestId(this.form, index, gridForm);

    formGroup.disable();
  }
  updateTotalPrice(formGroup: FormGroup) {
    const quantity = formGroup.get('quantity')?.value || 0;
    const unitprice = formGroup.get('unitprice')?.value || 0;
    const totalprice = quantity * unitprice;
    formGroup.get('totalprice')?.setValue(totalprice, { emitEvent: false });
  }

  getDeptData() {
    const paramsdept = {
      param1: 1088,
      param3: 'DEPT',
      param4: 'ALL',
    };

    this.apiService.getDeptData(paramsdept).subscribe({
      next: (data) => {
        console.log('Data received:', data);

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
    const paramsacc = {
      param1: 1088,
      param2: 2,
      param3: 'HIG',
      param4: codekey,
      param5: 'PO',
    };

    this.apiService.getAccData(paramsacc).subscribe({
      next: (data) => {
        console.log('data', data);
        this.accountData = data.map((account: any, index: number) => ({
          id: index,
          accName: account.accName,
          accountCode: account.accountCode,
        }));

        console.log('accountData', this.accountData);
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
    console.log('vendor', vendor);

    const paramsvendoritem = {
      param1: 1088,
      param2: vendor?.vendorId, //vendorid
      param3: 'HIG',
      param4: 0,
      param5: 3,
    };
    console.log('paramsvendoritem', paramsvendoritem);

    this.apiService.getVendorItemData(paramsvendoritem).subscribe({
      next: (data) => {
        console.log('data', data);

        this.vendorPart = data.map((item: any) => ({
          vendPartDesc: item.vendPartDesc,
          itemId: item.itemID,
        }));

        console.log('vendorPart', this.vendorPart);
      },

      error: (error) => {
        console.error('Error fetching data:', error);
      },

      complete: () => {
        console.log('Vendor Item Data fetching completed.');
      },
    });
  }

  getRequestId(form: any, index: number, gridForm: any) {
    const paramsrequest = {
      param1: 1088,
      param2: 'HIG',
      param3: 'SEQ',
    };

    let reqID: number;

    this.apiService.getRequestId(paramsrequest).subscribe({
      next: (data) => {
        console.log('data', data);
        reqID = data[0].codeValue1;
        console.log('reqID', reqID);
        this.savePO(reqID, form, index, gridForm);
      },

      error: (error) => {
        console.error('Error fetching data:', error);
      },

      complete: () => {
        console.log('Req ID Data fetching completed.');
      },
    });
  }

  savePO(reqID: number, form: any, index: number, gridForm: any) {
    const paramsPO = [
      {
        expItem: gridForm?.Account?.accName,
        purpose: form?.purpose,
        reqId: reqID,
        startDate: form?.startDate,
        expLineNo: index,
        preAmount: gridForm?.totalprice,
        masterFlag: 0,
        preferredVendor: form?.preferredVendor,
        accountCode: gridForm?.Accounct?.acccountCode,
        quantity: gridForm?.quantity,
        packageUnit: '',
        unitPrice: gridForm?.unitprice,
        vendPartno: gridForm?.VendorPart.itemId,
        taxCalculated: 0,
        taxPercent: 0,
        deptCode: gridForm?.Department?.codeKey,
        reqDeliveryDate: gridForm?.delDate,
        managerEmail: form?.managerEmail,
        status: 'Saved',
        userId: 7323,
        expDate: '',
        citiesVstd: '',
        amtSpent: 0,
        currency: '',
        comments: '',
        statusId: 3,
        managerId: 7406,
        orgId: 1088,
        payMode: '',
        preApproved: 2,
        actualAmount: 0,
        othercity: '',
        addedOn: '',
        codeValue: '',
        apReview: '',
        exp: '',
        codeId: '',
        stateId: '',
        expType: '',
        jobCode: '',
        phaseCode: '',
        JCatCode: '',
        compCode: 'HIG',
        detailsFlag: 1,
        automileageFlag: 0,
        fromCity: '',
        toCity: '',
        agentName: '',
        itinararyNo: '',
        bookedDate: '',
        fromDate: '',
        toDate: '',
        totTrip: 0,
        LNorm: 0,
        reimbt: 0,
        attCnt: 0,
        otherFromCity: '',
        otherToCity: '',
        companyCar: '',
        outOfCity: false,
        otherPlace: '',
        ourRefNo: '',
        budgetLimit: '',
        budget: 0,
        remaining: 0,
        shippingCost: 0,
        invCnt: 0,
        balAfterPO: 0,
        taxAmount1: 0,
        taxAmount2: 0,
        taxAmount3: 0,
        reimbursable: '',
        vendorEmail: '',
        fiscalMonth: '',
        polineseq: '0',
        qtyReceived: 0,
        // poInvAmount: 0,
        invLineNo: 0,
        poAmount: 0,
        csuserid: 0,
        contactCnt: 0,
        mgrGroupCode: 'GMPLUS',
        vendorFlag: '',
        deptChgCmt: '',
        itemCode: '',
        receiveCnt: 0,
        promoCode: '',
        discount: '0',
        discountFlag: 'N',
        onBeHalfOf: '',
        expItemAccCode: '',
        lastUpdSource: 'mobile',
        qbVendId: 0,
        qbAcctId: 0,
        qbItemId: 0,
        jobId: 0,
        className: '',
        classRefId: '0',
        sendtoqb: '',
        priceFlag: '',
        ccEmail: '',
      },
    ];

    this.apiService.savePO(paramsPO).subscribe({
      next: (data) => {
        console.log('data', data);
      },

      error: (error) => {
        console.error('Error fetching data:', error);
      },

      complete: () => {
        console.log('Save PO Data fetching completed.');
      },
    });
  }
}
