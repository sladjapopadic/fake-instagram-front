import {CommentResponseDto} from "../../comment/dto/comment-response-dto";

export interface PostDto {

  id: number;
  username: string;
  caption: string;
  comments: CommentResponseDto[];
  likes: number;
  liked: boolean;
  userId: number;
}
