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
import {AccountComponent} from './account/account.component';
import {DiscoverComponent} from './discover/discover.component';
import {UserCardComponent} from './user-card/user-card.component';
import {ProfileComponent} from './profile/profile.component';
import {SearchResultComponent} from './search-result/search-result.component';

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
      },
      {
        path: 'discover',
        component: DiscoverComponent
      },
      {
        path: 'users/:userId',
        component: ProfileComponent
      },
      {
        path: 'search/:term',
        component: SearchResultComponent
      },
      {
        path: 'account',
        component: AccountComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    SecuredComponent,
    HomeComponent,
    PostComponent,
    CreatePostComponent,
    AccountComponent,
    DiscoverComponent,
    UserCardComponent,
    ProfileComponent,
    SearchResultComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatSidenavModule,
    MatListModule
  ],
})
export class SecuredModule {
}
