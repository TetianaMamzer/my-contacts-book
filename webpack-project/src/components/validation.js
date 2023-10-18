export class Validate {
  validateName(value) {
    const regName = /^[ \a-zA-Z0-9_\.-]{3,30}$/;
    let result, message;
  
    if (value.trim().length > 0 && regName.test(value.trim())) {
      result = true;
      message = "Looks good!";
    } else {
      result = false;
      message =
        "Please enter name. The name must contain more than 3 characters.";
    }
    return {
      result,
      message,
    };
  }

  validateEmail(value) {
    const regEmail = /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    let result, message;
    if (regEmail.test(value.trim())) {
      result = true;
      message = "Looks good!";
    } else {
      result = false;
      message = "Please enter email. For example: example@gmail.com";
    }
  
    return {
      result,
      message,
    };
  }

  validateCode(value) {
    const regCode = /^([0-9]{4})$/;
    let result, message;
    if (regCode.test(value.trim())) {
      result = true;
      message = "Looks good!";
    } else {
      result = false;
      message = "Please enter code. The code must contain 4 numbers";
    }
    return {
      result,
      message,
    };
  }
  
}
