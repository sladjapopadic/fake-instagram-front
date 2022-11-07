import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/auth/service/auth.service";
import {FormControl, FormGroup, UntypedFormControl, Validators} from "@angular/forms";
import {LoggedUserService} from "../../shared/logged-user/logged-user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RegistrationConfirmationResult} from "../../shared/auth/enums/registration-confirm-result";
import {UsernameValidator} from "../../shared/validator/username.validator";
import {PasswordValidator} from "../../shared/validator/password.validator";

@Component({
  selector: 'app-register-confirmation',
  templateUrl: './register-confirmation.component.html',
  styleUrls: ['./register-confirmation.component.css']
})
export class RegisterConfirmationComponent implements OnInit {

  form: FormGroup;
  usernameFormControl: UntypedFormControl;
  passwordFormControl: UntypedFormControl;
  registrationConfirmResult: RegistrationConfirmationResult;

  RegistrationConfirmationResult = RegistrationConfirmationResult;

  constructor(private authService: AuthService, private loggedUserService: LoggedUserService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.usernameFormControl = new FormControl('', Validators
      .compose([Validators.required, UsernameValidator, this.noWhitespaceValidator]));
    this.passwordFormControl = new FormControl('', Validators
      .compose([Validators.required, Validators.minLength(8), PasswordValidator]));

    this.form = new FormGroup({
      username: this.usernameFormControl,
      password: this.passwordFormControl,
    });
  }

  noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g);
    return isSpace ? {'whitespace': true} : null;
  }

  confirm(): void {
    if (!this.form.valid) {
      return;
    }

    this.authService.confirm(this.usernameFormControl.value, this.passwordFormControl.value, this.route.snapshot.params['token'])
      .subscribe(confirmResponse => {
        const confirmSuccessful = confirmResponse.token && confirmResponse.confirmRegistrationResult === RegistrationConfirmationResult.SUCCESS;

        if (confirmSuccessful) {
          this.loggedUserService.setLoggedUser(confirmResponse.token, confirmResponse.userId);
          this.router.navigate(['secured']);
        } else {
          this.registrationConfirmResult = confirmResponse.confirmRegistrationResult;
        }
      })
  }
}
