import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/user/service/user.service";
import {ActivatedRoute} from "@angular/router";
import {UserDto} from "../../shared/user/dto/user-dto";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  searchResult: UserDto[];

  constructor(private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.searchUsers();

    this.route.params.subscribe(() => {
      this.searchUsers();
    });
  }

  private searchUsers(): void {
    const searchTerm = this.route.snapshot.params['term'];

    this.userService.search(searchTerm)
      .subscribe(searchResult => {
        this.searchResult = searchResult;
      })
  }

  getUserImageUrl(userId: number): string {
    return this.userService.getUserImageUrl(userId);
  }
}
