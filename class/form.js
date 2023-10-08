import { users } from "./script.js";
import { createTable } from "./table.js";
import { Validate } from "./validation.js";

const valid = new Validate();
const nameIsValid = document.querySelector(".name-valid");
const emailIsValid = document.querySelector(".email-valid");
const codeIsValid = document.querySelector(".code-valid");

const form = document.forms.addUser;
const name = form.elements.name;
const email = form.elements.email;
const code = form.elements.code;

const applyForm = () => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const valName = valid.validateName(name.value);
    const valCode = valid.validateCode(code.value);
    const valEmail = valid.validateEmail(email.value);
    const modalText = document.querySelector('.modal-body');
  
    if (valName.result && valCode.result && valEmail.result) {
      formHandle(event);

      code.classList.remove("is-valid", "is-invalid");
      codeIsValid.classList.remove("valid-feedback", "invalid-feedback");
      name.classList.remove("is-valid", "is-invalid");
      nameIsValid.classList.remove("valid-feedback", "invalid-feedback");
      email.classList.remove("is-valid", "is-invalid");
      emailIsValid.classList.remove("valid-feedback", "invalid-feedback");
      modalText.innerText = "Perfectly! New contact added"
    } else {
      modalText.innerText = "Oops! Fill in all fields correctly!"
    }
  });

  function formHandle(e) {
    e.preventDefault();
  
   console.log(users)
    // update
    if (form.hasAttribute("data-id")) {
      
      users.updateUser({
        id: form.getAttribute("data-id"),
        name: form.elements.name.value,
        email: form.elements.email.value,
        code: form.elements.code.value,
      });

      form.removeAttribute("data-id");
    } else {
      // add
      users.addUser({
        name: form.elements.name.value,
        email: form.elements.email.value,
        code: form.elements.code.value,
      })
    }
  
    form.reset();
    // logUsers();
    createTable();
  }

  code.addEventListener("blur", function () {
    const resultValidation = valid.validateCode(code.value);
    if (resultValidation.result) {
      code.classList.add("is-valid");
      codeIsValid.classList.add("valid-feedback");
    } else {
      code.classList.add("is-invalid");
      codeIsValid.classList.add("invalid-feedback");
    }
    codeIsValid.innerText = resultValidation.message;
  });
  
  code.addEventListener("focus", function () {
    code.classList.remove("is-valid", "is-invalid");
    codeIsValid.classList.remove("valid-feedback", "invalid-feedback");
  });
  
  email.addEventListener("blur", function () {
    const resultValidation = valid.validateEmail(email.value);
    if (resultValidation.result) {
      email.classList.add("is-valid");
      emailIsValid.classList.add("valid-feedback");
    } else {
      email.classList.add("is-invalid");
      emailIsValid.classList.add("invalid-feedback");
    }
    emailIsValid.innerText = resultValidation.message;
  });
  
  email.addEventListener("focus", function () {
    email.classList.remove("is-valid", "is-invalid");
    emailIsValid.classList.remove("valid-feedback", "invalid-feedback");
  });

  name.addEventListener("blur", function () {
    const resultValidation = valid.validateName(name.value);
    if (resultValidation.result == true) {
      name.classList.add("is-valid");
      nameIsValid.classList.add("valid-feedback");
    } else {
      name.classList.add("is-invalid");
      nameIsValid.classList.add("invalid-feedback");
    }
    nameIsValid.innerText = resultValidation.message;
  });
  
  name.addEventListener("focus", function () {
    name.classList.remove("is-valid", "is-invalid");
    nameIsValid.classList.remove("valid-feedback", "invalid-feedback");
  });

}

function fillForm(currentUser) {
  form.elements.name.value = currentUser.name;
  form.elements.email.value = currentUser.email;
  form.elements.code.value = currentUser.code;
  form.setAttribute("data-id", currentUser.id);
}
export {
  applyForm,
  fillForm
}

