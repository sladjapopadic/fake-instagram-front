import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PublicComponent} from './public.component';
import {SharedModule} from "../shared/shared.module";
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RegisterConfirmationComponent} from './register-confirmation/register-confirmation.component';
import {FogotPasswordComponent} from './fogot-password/fogot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'confirm/:token',
        component: RegisterConfirmationComponent
      },
      {
        path: 'forgotPassword',
        component: FogotPasswordComponent
      },
      {
        path: 'resetPassword/:token',
        component: ResetPasswordComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent,
    RegisterComponent,
    RegisterConfirmationComponent,
    FogotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PublicModule {
}
