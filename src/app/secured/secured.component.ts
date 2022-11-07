import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoggedUserService} from "../shared/logged-user/logged-user.service";
import {map, Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-secured',
  templateUrl: './secured.component.html',
  styleUrls: ['./secured.component.css']
})
export class SecuredComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  loggedUserId: number;

  constructor(private router: Router, private loggedUserService: LoggedUserService, private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    if (!this.loggedUserService.isUserLoggedIn()) {
      this.router.navigate(['public']);
    }
    this.loggedUserId = this.loggedUserService.getUserId();
  }

  logout() {
    this.loggedUserService.clearLocalStorage();
    this.router.navigate(['public']);
  }

  searchUsers(searchTerm: string): void {
    this.router.navigate(['secured/search/' + searchTerm]);
  }
}
