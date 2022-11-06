import {RegistrationConfirmationResult} from "../enums/registration-confirm-result";

export interface RegisterConfirmationResponseDto {

  confirmRegistrationResult: RegistrationConfirmationResult;
  token: string;
  userId: number;
}
