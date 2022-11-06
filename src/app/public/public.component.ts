import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoggedUserService} from "../shared/logged-user/logged-user.service";

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  constructor(private router: Router, private loggedUserService: LoggedUserService) {
  }

  ngOnInit(): void {
    if (!this.loggedUserService.isUserLoggedIn()) {
      this.router.navigate(['public']);
    }
  }

}
