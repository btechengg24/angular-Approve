import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { tap } from 'rxjs';
import { EntityService } from 'src/api/entity.service';
import { User } from '@shared/interfaces/index';
import { MenuComponent } from '@shared/menu/menu.component';
import { webMethod } from '@util/webmethods';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MenuComponent,
    ButtonModule,
    CommonModule,
    InputTextModule,
    ProgressBarModule,
    ReactiveFormsModule,
  ],
  providers: [EntityService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  public loginForm: FormGroup;
  showProgress: boolean = false;

  constructor(
    private route: ActivatedRoute,
    // private entity: EntityService,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      pwd: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  submit() {
    this.showProgress = true;
    // this.entity.callAPI$("POST", webMethod.getUserInfo, this.formGroup?.controls['user'])
    //   .pipe(
    //     tap(_ => {
    //       console.log('data: ', _);
    //       this.showProgress = false;
    //     }),
    //   );
    // this.entity
    //   .callAPI$(webMethod.getUserInfo, this.loginForm?.value.user)
    //   .subscribe((_useInfo) => {
    //     localStorage.setItem('currentUser', _useInfo);
    //     this.showProgress = false;
    //     this.router.navigateByUrl('newpo', { replaceUrl: true });
    //   });
  }
}
