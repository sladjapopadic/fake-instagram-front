import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, UntypedFormControl, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth/service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ResetPasswordResult} from "../../shared/auth/enums/reset-password-result";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;
  newPasswordFormControl: UntypedFormControl;
  oldPasswordFormControl: UntypedFormControl;
  repeatedNewPasswordFormControl: UntypedFormControl;
  resetResult: ResetPasswordResult;
  notEqualPassword: boolean;

  ResetPasswordResult = ResetPasswordResult;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.newPasswordFormControl = new FormControl('', [Validators.required]);
    this.oldPasswordFormControl = new FormControl('', [Validators.required]);
    this.repeatedNewPasswordFormControl = new FormControl('', [Validators.required]);

    this.repeatedNewPasswordFormControl.valueChanges
      .subscribe(() => this.notEqualPassword = false);

    this.newPasswordFormControl.valueChanges
      .subscribe(() => this.notEqualPassword = false);

    this.form = new FormGroup({
      oldPassword: this.oldPasswordFormControl,
      newPassword: this.newPasswordFormControl,
      repeatedNewPassword: this.repeatedNewPasswordFormControl
    })
  }

  resetPassword(): void {
    if (!this.form.valid) {
      return;
    }

    if (this.newPasswordFormControl.value !== this.repeatedNewPasswordFormControl.value) {
      this.notEqualPassword = true;
      return;
    }

    this.authService.resetPassword(this.oldPasswordFormControl.value, this.newPasswordFormControl.value, this.route.snapshot.params['token'])
      .subscribe(resetPasswordResponseDto => {
        const resetSuccessful = resetPasswordResponseDto.resetPasswordResult === ResetPasswordResult.SUCCESS;

        if (resetSuccessful) {
          this.router.navigate(['public']);
        } else {
          this.resetResult = resetPasswordResponseDto.resetPasswordResult;
        }
      })
  }

}
