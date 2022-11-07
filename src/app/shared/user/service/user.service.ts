import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserDto} from "../dto/user-dto";
import {HttpClient} from "@angular/common/http";
import {UserResponseDto} from "../dto/user-response-dto";
import {UpdateResponseDto} from "../dto/update-response-dto";

@Injectable()
export class UserService {

  URL = 'http://localhost:8080/users';

  constructor(private httpClient: HttpClient) {
  }

  getUserImageUrl(userId: number): string {
    return this.URL + '/' + userId + '/profileImage?timestamp=' + new Date();
  }

  discover(): Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>(this.URL + '/discover');
  }

  getProfile(userId: number): Observable<UserResponseDto> {
    return this.httpClient.get<UserResponseDto>(this.URL + '/' + userId + '/profile');
  }

  follow(userId: number): Observable<void> {
    return this.httpClient.post<void>(this.URL + '/' + userId + '/follow', {});
  }

  unfollow(userId: number): Observable<void> {
    return this.httpClient.post<void>(this.URL + '/' + userId + '/unfollow', {});
  }

  search(term: string): Observable<UserDto[]> {
    return this.httpClient.get<UserDto[]>(this.URL + '/search?username=' + term);
  }

  updateProfileImage(file: File): Observable<void> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.put<void>(this.URL + '/profileImage', formData);
  }

  updateUsername(username: string): Observable<UpdateResponseDto> {
    return this.httpClient.patch<UpdateResponseDto>(this.URL + '/updateUsername', username);
  }

  updateEmail(email: string): Observable<UpdateResponseDto> {
    return this.httpClient.patch<UpdateResponseDto>(this.URL + '/updateEmail', email);
  }

  updatePassword(password: string): Observable<UpdateResponseDto> {
    return this.httpClient.patch<UpdateResponseDto>(this.URL + '/updatePassword', password);
  }
}
