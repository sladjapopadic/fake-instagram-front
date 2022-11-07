import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoggedUserGuard} from "./guard/logged-user-guard";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'secured',
        pathMatch: 'full'
      },
      {
        path: 'public',
        loadChildren: () => import('./public/public.module').then(module => module.PublicModule)
      },
      {
        path: 'secured',
        loadChildren: () => import('./secured/secured.module').then(module => module.SecuredModule),
        canActivate: [LoggedUserGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
