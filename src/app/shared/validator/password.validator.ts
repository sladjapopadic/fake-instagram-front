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
      passwordStrength: 'Password should:\n' +
        '● contain at least 1 lowercase letter\n' +
        '● contain at least 1 uppercase letter\n' +
        '● contain at least 1 special character\n' +
        '● contain at least 1 digit\n' +
        '● be at least 8 characters long'
    }
  }
  return null;
}
