export interface ExpenseTypeOption {
  id: number;
  value: string;
}

export interface VendorData {
  preferredVendor?: string;
  vendorId?: number;
}

export interface DepartmentData {
  codeKey?: string;
  description?: string;
  orgId?: string;
  codeId?: string;
  preferredVendor?: string;
  vendorId?: string;
}

export interface AccountData {
  id?: number;
  accName?: string;
  acccountCode: string;
}

export interface VendorPart {
  vendPartDesc?: string;
  itemId?: number;
}

export interface Row {
  Department: string;
  Account: string;
  VendorPart: string;
  Item: string;
  delDate: string;
  quantity: string;
  unitprice: string;
  totalprice: string;
}

export interface POData {
  ourRefNo: string;
  expLineNo: number;
  polineseq: number;
  deptCode: string;

  accountCode: string;
  expItem: string;
  account: string;

  vendPartno: string;

  quantity: number;
  unitPrice: number;
  preAmount: number;
  taxAmount1: number;
  taxAmount2: number;
  taxAmount3: number;
  taxCalculated: number;
  // the above are just duplicated for the inv part too
  invQuantity: number;
  invUnitPrice: number;
  invAmount: number;
  invTax: number;

  shippingCost: number;
  invLineNo: number;
  comments: string;

  taxPercent: number;
}
