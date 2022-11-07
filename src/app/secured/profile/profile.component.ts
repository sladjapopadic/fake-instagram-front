import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/user/service/user.service";
import {ActivatedRoute} from "@angular/router";
import {UserResponseDto} from "../../shared/user/dto/user-response-dto";
import {LoggedUserService} from "../../shared/logged-user/logged-user.service";
import {PostService} from "../../shared/post/service/post.service";
import {ProfileTab} from "./enums/profile-tab";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile: UserResponseDto;
  userImageUrl: string;
  loggedUserId: number;
  userId: number;
  selectedTab: ProfileTab;
  loggedUserFollowing: boolean;

  ProfileTab = ProfileTab;

  constructor(private userService: UserService, private route: ActivatedRoute, private loggedUserService: LoggedUserService,
              private postService: PostService) {
  }

  ngOnInit(): void {
    this.selectedTab = ProfileTab.POSTS;

    this.userId = this.route.snapshot.params['userId'];
    this.userImageUrl = this.userService.getUserImageUrl(this.userId);
    this.loggedUserId = this.loggedUserService.getUserId();

    this.loadProfile();

    this.route.params.subscribe(() => {
      this.loadProfile();
    });
  }

  loadProfile(): void {
    this.userId = this.route.snapshot.params['userId'];
    this.userImageUrl = this.userService.getUserImageUrl(this.userId);

    this.userService.getProfile(this.userId)
      .subscribe(userProfile => {
        this.userProfile = userProfile;

        this.loggedUserFollowing = this.userProfile.followers
          .map(follower => follower.userId)
          .includes(this.loggedUserId);

        this.selectedTab = ProfileTab.POSTS;
      })
  }

  getUserImage(userId: number): string {
    return this.userService.getUserImageUrl(userId);
  }

  getPostImage(postId: number): string {
    return this.postService.getPostImageUrl(postId);
  }

  setSelectedTab(profileTab: ProfileTab): void {
    this.selectedTab = profileTab;
  }

  follow(): void {
    this.userService.follow(this.userId)
      .subscribe(() => {
        this.loadProfile();
      })
  }

  unfollow(): void {
    this.userService.unfollow(this.userId)
      .subscribe(() => {
        this.loadProfile();
      })
  }
}
