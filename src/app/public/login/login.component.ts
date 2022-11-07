import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, UntypedFormControl, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth/service/auth.service";
import {LoggedUserService} from "../../shared/logged-user/logged-user.service";
import {Router} from "@angular/router";

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
    this.usernameFormControl = new FormControl('', [Validators.required]);
    this.passwordFormControl = new FormControl('', [Validators.required]);

    this.form = new FormGroup({
      username: this.usernameFormControl,
      password: this.passwordFormControl,
    });
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
