import { Component, OnInit } from '@angular/core';
import { EntityService } from '@api/entity.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { CroppopupComponent } from '@shared/croppopup/croppopup.component';

@Component({
  selector: 'app-crop',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    CheckboxModule,
    ReactiveFormsModule,
  ],
  providers: [DialogService],
  templateUrl: './crop.component.html',
  styleUrl: './crop.component.css',
})
export class CropComponent implements OnInit {
  programInformation: any[] = [];
  childData: any[] = [];
  formGroups: FormGroup[] = [];
  childInEachProgram: any[] = [];
  totalFee: number = 0;

  dialogRef: DynamicDialogRef | undefined;

  constructor(
    private entityService: EntityService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.programInfo();
  }

  programInfo() {
    this.entityService.callAPI2$('program').subscribe({
      next: (data) => {
        this.programInformation = data;
        console.log('programInformation', this.programInformation);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        console.log('Vendor Data fetching completed.');
      },
    });
    this.programInformation.forEach((program) => {
      this.childInEachProgram.push({
        ProgramID: program.ProgramID,
        Name: program.Name,

        ElderChildFee: program.ElderChildFee,
        YoungerChildFee: program.YoungerChildFee,
        NumberOfChildren: 0,
        Children: [],
        ElderChild: -1,
      });
    });

    console.log('childInEachProgram', this.childInEachProgram);
  }

  onClickNewChild() {
    const newChild = {
      name: `child ${this.childData.length + 1}`,
      program: [],
      fee: 0,
    };

    this.dialogRef = this.dialogService.open(CroppopupComponent, {
      header: 'Popup',
      width: '70%',
      height: '100%',
      data: {
        programInformation: this.programInformation,
      },
    });

    this.dialogRef.onClose.subscribe((returnedData) => {
      if (returnedData) {
        console.log('Returned Data from popup:', returnedData);
        newChild.program = returnedData;
        console.log('childData', this.childData);
        this.calculateEachChildFee();
      }
    });
    this.childData.push(newChild);
    this.formGroupMapper(newChild);
  }

  formGroupMapper(childData: any) {
    const formGroup = new FormGroup({
      name: new FormControl(childData.name),
      program: new FormControl(childData.program),
      fee: new FormControl(childData.fee),
    });
    this.formGroups.push(formGroup);
  }

  handleFeeChanges(event: any, childIndex: number, programIndex: number) {
    console.log('event', event);
    console.log('childIndex', childIndex);
    console.log('programIndex', programIndex);

    const checked = event.checked;
    console.log('checked', checked.length);

    if (checked.length === 1) {
      this.childInEachProgram[programIndex].NumberOfChildren++;
      this.childInEachProgram[programIndex].Children.push(childIndex);
      this.childData[childIndex].program.push(programIndex);
    } else {
      const childIndexInProgram =
        this.childInEachProgram[programIndex].Children.indexOf(childIndex);
      console.log('childIndexInProgram', childIndexInProgram);

      const programIndexInChild =
        this.childData[childIndex].program.indexOf(programIndex);
      console.log('programIndexInChild', programIndexInChild);

      if (childIndexInProgram !== -1) {
        this.childInEachProgram[programIndex].NumberOfChildren--;
        this.childInEachProgram[programIndex].Children.splice(
          childIndexInProgram,
          1
        );
      }

      if (programIndexInChild !== -1) {
        this.childData[childIndex].program.splice(programIndexInChild, 1);
      }
    }

    this.calculateEachChildFee();

    console.log('childInEachProgram', this.childInEachProgram);
    console.log('childData', this.childData);
  }

  calculateEachChildFee() {
    console.log('in calculateEachChildFee');
    this.childInEachProgram.forEach((program: any) => {
      program.ElderChild = -1;
    });
    this.totalFee = 0;

    this.childData.forEach((child, index) => {
      child.fee = 0;
      console.log('child', child);

      child.program.forEach((program: any) => {
        if (this.childInEachProgram[program].ElderChild === -1) {
          console.log('no elder child');
          this.childInEachProgram[program].ElderChild = index;
          child.fee += this.childInEachProgram[program].ElderChildFee;
        } else {
          console.log('elder child');
          child.fee += this.childInEachProgram[program].YoungerChildFee;
        }
      });

      this.totalFee += child.fee;
    });
  }
}
