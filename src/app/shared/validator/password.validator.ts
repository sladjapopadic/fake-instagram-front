import {AbstractControl, ValidationErrors} from "@angular/forms"

export const PasswordValidator = function (control: AbstractControl): ValidationErrors | null {

  let value: string = control.value || '';
  if (!value) {
    return null;
  }

  let upperCaseCharacters = /[A-Z]+/g;
  let lowerCaseCharacters = /[a-z]+/g;
  let numberCharacters = /[0-9]+/g;
  let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (upperCaseCharacters.test(value) === false || lowerCaseCharacters.test(value) === false || numberCharacters.test(value) === false || specialCharacters.test(value) === false) {
    return {
      passwordStrength: ""
    }
  }
  return null;
}
