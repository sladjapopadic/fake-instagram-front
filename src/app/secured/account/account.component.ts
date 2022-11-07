import {Component, OnInit} from '@angular/core';
import {FormControl, UntypedFormControl, Validators} from "@angular/forms";
import {UserService} from "../../shared/user/service/user.service";
import {Router} from "@angular/router";
import {LoggedUserService} from "../../shared/logged-user/logged-user.service";
import {UsernameValidator} from "../../shared/validator/username.validator";
import {PasswordValidator} from "../../shared/validator/password.validator";
import {UpdateResult} from "../../shared/user/enums/update-result";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  file: File;
  usernameFormControl: UntypedFormControl;
  passwordFormControl: UntypedFormControl;
  emailFormControl: UntypedFormControl;

  updateResult: UpdateResult;

  UpdateResult = UpdateResult;

  constructor(private userService: UserService, private router: Router, private loggedUserService: LoggedUserService) {
  }

  ngOnInit(): void {
    this.usernameFormControl = new FormControl('', Validators
      .compose([Validators.required, UsernameValidator, this.noWhitespaceValidator]));
    this.passwordFormControl = new FormControl('', Validators
      .compose([Validators.required, Validators.minLength(8), PasswordValidator]));
    this.emailFormControl = new FormControl('', [Validators.required]);
  }

  noWhitespaceValidator(control: FormControl) {
    const isSpace = (control.value || '').match(/\s/g);
    return isSpace ? {'whitespace': true} : null;
  }

  onFileChanged(event: any) {
    this.file = (event.target).files[0] as File;
  }

  updateImage(): void {
    this.userService.updateProfileImage(this.file)
      .subscribe(() => {
        const userId = this.loggedUserService.getUserId();
        this.router.navigate(['/secured/users/' + userId]);
      })
  }

  updateUsername(): void {
    this.userService.updateUsername(this.usernameFormControl.value)
      .subscribe(updateResponse => {
        this.updateResult = updateResponse.updateResult;
      });
  }

  updateEmail(): void {
    this.userService.updateEmail(this.emailFormControl.value)
      .subscribe(updateResponse => {
        this.updateResult = updateResponse.updateResult;
      });
  }

  updatePassword(): void {
    this.userService.updatePassword(this.passwordFormControl.value)
      .subscribe(updateResponse => {
        this.updateResult = updateResponse.updateResult;
      });
  }
}
