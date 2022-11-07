import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {PostDto} from "../../shared/post/dto/post-dto";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnChanges {

  @Input() postDto: PostDto;
  @Input() imageUrl: string;
  @Input() userImageUrl: string;
  @Input() ownPost: boolean;
  @Output() likeEvent = new EventEmitter<number>();
  @Output() unlikeEvent = new EventEmitter<number>();

  postCopy: PostDto;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postDto']) {
      this.postCopy = {
        id: this.postDto.id,
        likes: this.postDto.likes,
        caption: this.postDto.caption,
        username: this.postDto.username,
        comments: this.postDto.comments,
        liked: this.postDto.liked,
        userId: this.postDto.userId
      }
    }
  }

  likeClick(postId: number): void {
    this.postCopy.liked = true;
    this.likeEvent.emit(postId);
    this.postCopy.likes++;
  }

  unlikeClick(postId: number): void {
    this.postCopy.liked = false;
    this.unlikeEvent.emit(postId);
    this.postCopy.likes--;
  }
}

