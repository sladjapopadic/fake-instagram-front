import {AbstractControl, ValidationErrors} from "@angular/forms"

export const UsernameValidator = function (control: AbstractControl): ValidationErrors | null {

  let value: string = control.value || '';
  if (!value) {
    return null;
  }

  let upperCaseCharacters = /[A-Z]+/g;
  if (upperCaseCharacters.test(value) === true) {
    return {
      passwordStrength: 'Username can not contain uppercase letters'
    }
  }
  return null;
}
