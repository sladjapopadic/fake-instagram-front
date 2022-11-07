import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/user/service/user.service";
import {UserDto} from "../../shared/user/dto/user-dto";

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

  users: UserDto[];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.discover()
      .subscribe(users => {
        this.users = users;
      })
  }

  getUserImageUrl(userId: number): string {
    return this.userService.getUserImageUrl(userId);
  }
}
