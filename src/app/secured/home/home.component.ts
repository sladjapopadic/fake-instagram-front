import {Component, OnInit} from '@angular/core';
import {PostService} from "../../shared/post/service/post.service";
import {PostDto} from "../../shared/post/dto/post-dto";
import {LikeService} from "../../shared/like/service/like.service";
import {UserService} from "../../shared/user/service/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: PostDto[];

  constructor(private postService: PostService, private likeService: LikeService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.postService.getFollowedUsersPosts()
      .subscribe(posts => {
        this.posts = posts;
      })
  }

  getPostImageUrl(id: number): string {
    return this.postService.getPostImageUrl(id);
  }

  onLike(postId: number): void {
    this.likeService.likePost(postId)
      .subscribe();
  }

  onUnlike(postId: number) {
    this.likeService.unlikePost(postId)
      .subscribe();
  }

  getUserImageUrl(userId: number): string {
    return this.userService.getUserImageUrl(userId);
  }
}
