import {Injectable} from "@angular/core";

@Injectable()
export class LoggedUserService {

  TOKEN_STORAGE_KEY = 'token';
  USER_ID_STORAGE_KEY = 'user-id'

  public isUserLoggedIn(): boolean {
    if (!localStorage.getItem(this.TOKEN_STORAGE_KEY)) {
      return false;
    }
    return true;
  }

  setLoggedUser(token: string, userId: number) {
    localStorage.setItem(this.TOKEN_STORAGE_KEY, token);
    localStorage.setItem(this.USER_ID_STORAGE_KEY, userId.toString())
  }

  public getToken() {
    return localStorage.getItem(this.TOKEN_STORAGE_KEY);
  }

  public getUserId(): number {
    return Number(localStorage.getItem(this.USER_ID_STORAGE_KEY));
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}
