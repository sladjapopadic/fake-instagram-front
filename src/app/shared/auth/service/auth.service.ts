import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {LoginResponseDto} from "../dto/login-response-dto";
import {LoginRequestDto} from "../dto/login-request-dto";
import {HttpClient} from "@angular/common/http";
import {RegisterRequestDto} from "../dto/register-request-dto";
import {RegisterResponseDto} from "../dto/register-response-dto";
import {RegisterConfirmationRequestDto} from "../dto/register-confirmation-request-dto";
import {RegisterConfirmationResponseDto} from "../dto/register-confirmation-response-dto";
import {ResetPasswordResponseDto} from "../dto/reset-password-response-dto";
import {ResetPasswordRequestDto} from "../dto/reset-password-request-dto";

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  public login(username: string, password: string): Observable<LoginResponseDto> {
    const loginRequest: LoginRequestDto = {
      username: username,
      password: password
    }
    return this.httpClient.post<LoginResponseDto>('http://localhost:8080/auth/login', loginRequest);
  }

  public register(username: string, password: string, email: string): Observable<RegisterResponseDto> {
    const registerRequestDto: RegisterRequestDto = {
      username: username,
      password: password,
      email: email
    }
    return this.httpClient.post<RegisterResponseDto>('http://localhost:8080/auth/register', registerRequestDto);
  }

  public confirm(username: string, password: string, token: string): Observable<RegisterConfirmationResponseDto> {
    const registerConfirmationRequestDto: RegisterConfirmationRequestDto = {
      username: username,
      password: password,
      token: token
    }
    return this.httpClient.patch<RegisterConfirmationResponseDto>('http://localhost:8080/auth/confirm', registerConfirmationRequestDto);
  }

  public forgotPassword(email: string): Observable<void> {
    return this.httpClient.post<void>('http://localhost:8080/auth/forgotPassword', email);
  }

  public resetPassword(oldPassword: string, newPassword: string, token: string): Observable<ResetPasswordResponseDto> {
    const resetPasswordRequestDto: ResetPasswordRequestDto = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      token: token
    }
    return this.httpClient.post<ResetPasswordResponseDto>('http://localhost:8080/auth/resetPassword', resetPasswordRequestDto);
  }
}
