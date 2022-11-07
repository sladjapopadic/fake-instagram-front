export interface CommentResponseDto {

  username: string;
  text: string;
  replies: CommentResponseDto[];
}
