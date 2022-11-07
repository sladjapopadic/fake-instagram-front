import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class LikeService {

  URL = 'http://localhost:8080/likes';

  constructor(private httpClient: HttpClient) {
  }

  likePost(postId: number): Observable<void> {
    return this.httpClient.post<void>(this.URL, postId);
  }

  unlikePost(postId: number): Observable<void> {
    return this.httpClient.delete<void>(this.URL + '/posts/' + postId);
  }
}
