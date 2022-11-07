import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostDto} from "../dto/post-dto";

@Injectable()
export class PostService {

  URL = 'http://localhost:8080/posts';

  constructor(private httpClient: HttpClient) {
  }

  getFollowedUsersPosts(): Observable<PostDto[]> {
    return this.httpClient.get<PostDto[]>(this.URL);
  }

  getPostImageUrl(postId: number): string {
    return this.URL + '/' + postId + '/image';
  }

  createPost(file: File, caption: string): Observable<void> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('caption', caption);
    return this.httpClient.post<void>(this.URL, formData);
  }

}
