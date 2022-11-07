import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'public',
        pathMatch: 'full'
      },
      {
        path: 'public',
        loadChildren: () => import('./public/public.module').then(module => module.PublicModule)
      },
      {
        path: 'secured',
        loadChildren: () => import('./secured/secured.module').then(module => module.SecuredModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
