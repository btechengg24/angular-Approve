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
import { EntityService } from 'src/api/entity.service';
import { MenuComponent } from '@shared/menu/menu.component';

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
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  public loginForm: FormGroup;
  showProgress: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      pwd: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  submit() {
    if (this.loginForm.valid) {
      this.showProgress = true;
      this.router.navigate(['/po']);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
