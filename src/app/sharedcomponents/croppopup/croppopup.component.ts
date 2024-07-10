import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-croppopup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CheckboxModule, ButtonModule],
  templateUrl: './croppopup.component.html',
  styleUrl: './croppopup.component.css',
})
export class CroppopupComponent implements OnInit {
  programInformation: any[] = [];

  formGroup!: FormGroup;

  constructor(
    private config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.programInformation = this.config.data.programInformation;
    console.log('programInformation', this.programInformation);

    this.formGroupMapper();
  }

  formGroupMapper() {
    // const group: any = {};

    // this.programInformation.forEach((program,index) => {
    //   console.log(program);
    //   group[index] = new FormControl(false);
    // });

    // this.formGroup = new FormGroup(group);

    // console.log('group', group);
    // console.log('formGroup', this.formGroup.value);

    const formControls: { [key: string]: FormControl } = {};

    this.programInformation.forEach((program) => {
      formControls[program.Name] = new FormControl(false);
    });

    this.formGroup = new FormGroup(formControls);
    console.log('formControls', formControls);
    console.log('formGroup', this.formGroup);
  }

  handleSave() {
    const formData = this.formGroup.value;
    console.log('formData', formData);

    const formattedData: any = [];
    this.programInformation.forEach((program, index) => {
      if (formData[program.Name] === true) {
        formattedData.push(index);
      }
    });

    this.dialogRef.close(formattedData);
  }
}
