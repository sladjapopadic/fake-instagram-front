export interface ResetPasswordRequestDto {

  oldPassword: string,
  newPassword: string,
  token: string
}
