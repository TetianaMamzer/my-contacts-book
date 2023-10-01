// const form = document.forms.addUser;
// const name = form.elements.name;
// const email = form.elements.email;
// const code = form.elements.code;

// const nameIsValid = document.querySelector(".name-valid");
// const emailIsValid = document.querySelector(".email-valid");
// const codeIsValid = document.querySelector(".code-valid");
// console.log(name.value)
// name.addEventListener("blur", function () {
//   const resultValidation = validateName(name.value);
//   if (resultValidation.result == true) {
//     name.classList.add("is-valid");
//     nameIsValid.classList.add("valid-feedback");
//   } else {
//     name.classList.add("is-invalid");
//     nameIsValid.classList.add("invalid-feedback");
//   }
//   nameIsValid.innerText = resultValidation.message;
// });

// name.addEventListener("focus", function () {
//   name.classList.remove("is-valid", "is-invalid");
//   nameIsValid.classList.remove("valid-feedback", "invalid-feedback");
// });

// function validateName(value) {
//   const regName = /^[ \a-zA-Z0-9_-]{3,20}$/;
//   let result, message;

//   if (value.trim().length > 0 && regName.test(value.trim())) {
//     result = true;
//     message = "Looks good!";
//   } else {
//     result = false;
//     message =
//       "Please enter name. The name must contain more than 3 characters.";
//   }
//   return {
//     result,
//     message,
//   };
// }

// email.addEventListener("blur", function () {
//   const resultValidation = validateEmail(email.value);
//   if (resultValidation.result) {
//     email.classList.add("is-valid");
//     emailIsValid.classList.add("valid-feedback");
//   } else {
//     email.classList.add("is-invalid");
//     emailIsValid.classList.add("invalid-feedback");
//   }
//   emailIsValid.innerText = resultValidation.message;
// });

// email.addEventListener("focus", function () {
//   email.classList.remove("is-valid", "is-invalid");
//   emailIsValid.classList.remove("valid-feedback", "invalid-feedback");
// });

// function validateEmail(value) {
//   const regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
//   let result, message;
//   if (regEmail.test(value.trim())) {
//     result = true;
//     message = "Looks good!";
//   } else {
//     result = false;
//     message = "Please enter email. For example: example@gmail.com";
//   }

//   return {
//     result,
//     message,
//   };
// }

// code.addEventListener("blur", function () {
//   const resultValidation = validateCode(code.value);
//   if (resultValidation.result) {
//     code.classList.add("is-valid");
//     codeIsValid.classList.add("valid-feedback");
//   } else {
//     code.classList.add("is-invalid");
//     codeIsValid.classList.add("invalid-feedback");
//   }
//   codeIsValid.innerText = resultValidation.message;
// });

// code.addEventListener("focus", function () {
//   code.classList.remove("is-valid", "is-invalid");
//   codeIsValid.classList.remove("valid-feedback", "invalid-feedback");
// });

// function validateCode(value) {
//   const regCode = /^([0-9]{4})$/;
//   let result, message;
//   if (regCode.test(value.trim())) {
//     result = true;
//     message = "Looks good!";
//   } else {
//     result = false;
//     message = "Please enter code. The code must contain 4 numbers";
//   }
//   return {
//     result,
//     message,
//   };
// }

// export {
//   validateCode,
//   validateEmail,
//   validateName
// }