import { Component } from '@angular/core';
import { PoheaderComponent } from '@shared/poheader/poheader.component';

@Component({
  selector: 'app-newpo',
  standalone: true,
  imports: [PoheaderComponent],
  templateUrl: './newpo.component.html',
  styleUrl: './newpo.component.css',
})
export class NewpoComponent {}
