import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SecuredComponent} from './secured.component';
import {SharedModule} from "../shared/shared.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {HomeComponent} from './home/home.component';
import {PostComponent} from './post/post.component';
import {CreatePostComponent} from './create-post/create-post.component';

const routes: Routes = [
  {
    path: '',
    component: SecuredComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'post',
        component: CreatePostComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    SecuredComponent,
    HomeComponent,
    PostComponent,
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatSidenavModule,
    MatListModule
  ]
})
export class SecuredModule {
}
