import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, UntypedFormControl, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth/service/auth.service";
import {LoggedUserService} from "../../shared/logged-user/logged-user.service";
import {Router} from "@angular/router";
import {PasswordValidator} from "../../shared/validator/password.validator";
import {UsernameValidator} from "../../shared/validator/username.validator";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  usernameFormControl: UntypedFormControl;
  passwordFormControl: UntypedFormControl;
  loginFailed: boolean;

  constructor(private authService: AuthService, private loggedUserService: LoggedUserService, private router: Router) {
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

  login(): void {
    if (!this.form.valid) {
      return;
    }

    this.authService.login(this.usernameFormControl.value, this.passwordFormControl.value)
      .subscribe(loginResponse => {
        const loginSuccessful = loginResponse.token && loginResponse.userId;

        if (loginSuccessful) {
          this.loggedUserService.setLoggedUser(loginResponse.token, loginResponse.userId);
          this.router.navigate(['secured']);
        } else {
          this.loginFailed = true;
        }
      })
  }
}
