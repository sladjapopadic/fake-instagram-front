import {PostDto} from "../../post/dto/post-dto";
import {UserDto} from "./user-dto";

export interface UserResponseDto {
  username: string;
  posts: PostDto[];
  followers: UserDto[];
  following: UserDto[];
}
