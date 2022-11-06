import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, UntypedFormControl, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth/service/auth.service";
import {RegistrationResult} from "../../shared/auth/enums/registration-result";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  usernameFormControl: UntypedFormControl;
  passwordFormControl: UntypedFormControl;
  repeatedPasswordFormControl: UntypedFormControl;
  emailFormControl: UntypedFormControl;
  registrationResult: RegistrationResult;
  completedRegistration: boolean;
  notEqualPassword: boolean;

  RegistrationResult = RegistrationResult;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.usernameFormControl = new FormControl('', [Validators.required]);
    this.passwordFormControl = new FormControl('', [Validators.required]);
    this.emailFormControl = new FormControl('', [Validators.required]);
    this.repeatedPasswordFormControl = new FormControl('', [Validators.required]);

    this.passwordFormControl.valueChanges
      .subscribe(() => this.notEqualPassword = false);

    this.repeatedPasswordFormControl.valueChanges
      .subscribe(() => this.notEqualPassword = false);

    this.form = new FormGroup({
      username: this.usernameFormControl,
      password: this.passwordFormControl,
      email: this.emailFormControl,
      repeatedPassword: this.repeatedPasswordFormControl
    });
  }

  register(): void {
    if (!this.form.valid) {
      return;
    }

    if (this.passwordFormControl.value !== this.repeatedPasswordFormControl.value) {
      this.notEqualPassword = true;
      return;
    }

    this.authService.register(this.usernameFormControl.value, this.passwordFormControl.value, this.emailFormControl.value)
      .subscribe(registerResponse => {
        if (registerResponse.registrationResult === RegistrationResult.SUCCESS) {
          this.completedRegistration = true;
        } else {
          this.registrationResult = registerResponse.registrationResult;
        }
      })
  }

}
