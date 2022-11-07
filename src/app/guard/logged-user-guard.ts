import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {LoggedUserService} from "../shared/logged-user/logged-user.service";
import {Injectable} from "@angular/core";

@Injectable()
export class LoggedUserGuard implements CanActivate {

  constructor(private loggedUserService: LoggedUserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.loggedUserService.isUserLoggedIn()) {
      this.router.navigate(['public']);
      return false;
    }

    return true;
  }


}
