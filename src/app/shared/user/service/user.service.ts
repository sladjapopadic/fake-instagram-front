import {Injectable} from "@angular/core";

@Injectable()
export class UserService {

  URL = 'http://localhost:8080/users';

  constructor() {
  }

  getUserImageUrl(userId: number): string {
    return this.URL + '/' + userId + '/profileImage';
  }
}
