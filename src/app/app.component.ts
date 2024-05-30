import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProgressBarModule, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ApproveIt';
  status = '';
  showProgress = this.router.events.pipe(
    filter((e) => [
      NavigationCancel, NavigationEnd, NavigationError, NavigationStart
    ].some((constructor) => e instanceof constructor)),
    map((e) => e instanceof NavigationStart),
    tap(e => { this.status = e ? 'navigating' : 'done' })
  );

  constructor(private router: Router) {}
}
