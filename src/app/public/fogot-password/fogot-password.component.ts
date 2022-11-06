import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/auth/service/auth.service";
import {FormControl, FormGroup, UntypedFormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-fogot-password',
  templateUrl: './fogot-password.component.html',
  styleUrls: ['./fogot-password.component.css']
})
export class FogotPasswordComponent implements OnInit {

  form: FormGroup;
  emailFormControl: UntypedFormControl;
  forgotPasswordEmailSent: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.emailFormControl = new FormControl('', [Validators.required]);

    this.form = new FormGroup({
      email: this.emailFormControl
    });
  }

  resetPassword(): void {
    if (!this.form.valid) {
      return;
    }

    this.authService.forgotPassword(this.emailFormControl.value)
      .subscribe(() => {
        this.forgotPasswordEmailSent = true;
      })
  }

}
