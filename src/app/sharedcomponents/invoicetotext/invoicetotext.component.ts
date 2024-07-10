import { Component, OnInit } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { MenuComponent } from '@shared/menu/menu.component';

// const { createWorker } = require('../../../app/tesseract.esm.min.js');

// import { createWorker } from 'tesseract.js';

@Component({
  selector: 'app-invoicetotext',
  imports: [FileUploadModule, MenuComponent],
  standalone: true,
  templateUrl: './invoicetotext.component.html',
  styleUrls: ['./invoicetotext.component.css'],
})
export class InvoicetotextComponent {
  async onFileSelect(event: any) {
    console.log('event:', event);

    const file: File = event.files[0];

    console.log('Selected file:', file);

    let fileUrl = URL.createObjectURL(file);
    console.log('File URL:', fileUrl);

    try {
      // const worker = await createWorker('eng');
      // const {
      //   data: { text },
      // } = await worker.recognize(file);
      // console.log('OCR Result:', text);
    } catch (error) {
      console.error('Error processing OCR:', error);
    }
  }

  onFileUpload(event: any) {
    console.log('FileUpload event:', event);
  }
}
