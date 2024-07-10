import { Component } from '@angular/core';
import { PoheaderComponent } from '@shared/poheader/poheader.component';
import { MenuComponent } from '@shared/menu/menu.component';

@Component({
  selector: 'app-newpo',
  standalone: true,
  imports: [PoheaderComponent,MenuComponent],
  templateUrl: './newpo.component.html',
  styleUrl: './newpo.component.css',
})
export class NewpoComponent {}
