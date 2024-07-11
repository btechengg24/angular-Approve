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
  childProgramData: any[] = [];

  formGroup!: FormGroup;

  constructor(
    private config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.programInformation = this.config.data.programInformation;
    this.childProgramData = this.config.data.childProgramData;
    console.log('programInformation', this.programInformation);
    console.log('childProgramData', this.childProgramData);

    this.formGroupMapper();
  }

  formGroupMapper() {
    const formControls: { [key: string]: FormControl } = {};

    if (this.childProgramData === undefined) {
      this.programInformation.forEach((program) => {
        formControls[program.Name] = new FormControl(false);
      });

      this.formGroup = new FormGroup(formControls);
    } else {
      this.programInformation.forEach((program, index) => {
        formControls[program.Name] = new FormControl(
          this.childProgramData[index]
        );
      });

      this.formGroup = new FormGroup(formControls);
    }

    console.log('formControls', formControls);
    console.log('formGroup', this.formGroup);
  }

  handleSave() {
    const formData = this.formGroup.value;
    console.log('formData', formData);

    this.dialogRef.close(formData);
  }
}
