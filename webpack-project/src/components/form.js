import { app } from "../index.js";
import { Validate } from "./validation.js";

const valid = new Validate();

export class Form {
  constructor() {
    this.nameIsValid = document.querySelector(".name-valid");
    this.emailIsValid = document.querySelector(".email-valid");
    this.codeIsValid = document.querySelector(".code-valid");

    this.form = document.forms.addUser;
    this.name = this.form.elements.name;
    this.email = this.form.elements.email;
    this.code = this.form.elements.code;

    this._loadEventListeners();

  }
   
  _loadEventListeners() {
  
    this.code.addEventListener("blur", this._codeBlurHandler.bind(this));
    this.code.addEventListener("focus", this._codeFocusHandler.bind(this));
    this.email.addEventListener("blur", this._emailBlurHandler.bind(this));
    this.email.addEventListener("focus", this._emailFocusHandler.bind(this));
    this.name.addEventListener("blur", this._nameBlurHandler.bind(this));
    this.name.addEventListener("focus", this._nameFocusHandler.bind(this));
    this.form.addEventListener("submit", this._formOnHandler.bind(this));

  }

   _codeBlurHandler() {
    const resultValidation = valid.validateCode(this.code.value);
    if (resultValidation.result) {
      this.code.classList.add("is-valid");
      this.codeIsValid.classList.add("valid-feedback");
    } else {
      this.code.classList.add("is-invalid");
      this.codeIsValid.classList.add("invalid-feedback");
    }
    this.codeIsValid.innerText = resultValidation.message;
  }
  
  _codeFocusHandler() {
    this.code.classList.remove("is-valid", "is-invalid");
    this.codeIsValid.classList.remove("valid-feedback", "invalid-feedback");
  }
  
  _emailBlurHandler() {
    const resultValidation = valid.validateEmail(this.email.value);
    if (resultValidation.result) {
      this.email.classList.add("is-valid");
      this.emailIsValid.classList.add("valid-feedback");
    } else {
      this.email.classList.add("is-invalid");
      this.emailIsValid.classList.add("invalid-feedback");
    }
    this.emailIsValid.innerText = resultValidation.message;
  }
  
  _emailFocusHandler() {
    this.email.classList.remove("is-valid", "is-invalid");
    this.emailIsValid.classList.remove("valid-feedback", "invalid-feedback");
  }

  _nameBlurHandler() {
    const resultValidation = valid.validateName(this.name.value);
    if (resultValidation.result == true) {
      this.name.classList.add("is-valid");
      this.nameIsValid.classList.add("valid-feedback");
    } else {
      this.name.classList.add("is-invalid");
      this.nameIsValid.classList.add("invalid-feedback");
    }
    this.nameIsValid.innerText = resultValidation.message;
  }
  
  _nameFocusHandler() {
    console.log(this)
    this.name.classList.remove("is-valid", "is-invalid");
    this.nameIsValid.classList.remove("valid-feedback", "invalid-feedback");
  }
  
  _formOnHandler(event) {
      event.preventDefault();
      event.stopPropagation();
      const valName = valid.validateName(this.name.value);
      const valCode = valid.validateCode(this.code.value);
      const valEmail = valid.validateEmail(this.email.value);
      const modalText = document.querySelector('.modal-body');
    
      if (valName.result && valCode.result && valEmail.result) {
        this.formHandle(event);
  
        this.code.classList.remove("is-valid", "is-invalid");
        this.codeIsValid.classList.remove("valid-feedback", "invalid-feedback");
        this.name.classList.remove("is-valid", "is-invalid");
        this.nameIsValid.classList.remove("valid-feedback", "invalid-feedback");
        this.email.classList.remove("is-valid", "is-invalid");
        this.emailIsValid.classList.remove("valid-feedback", "invalid-feedback");
        modalText.innerText = "Perfectly! New contact added"
      } else {
        modalText.innerText = "Oops! Fill in all fields correctly!"
      }
  }
  
    formHandle(e) {
      e.preventDefault();
      // update
      if (this.form.hasAttribute("data-id")) {
        
        app.users.updateUser({
          id: this.form.getAttribute("data-id"),
          name: this.form.elements.name.value,
          email: this.form.elements.email.value,
          code: this.form.elements.code.value,
        });
  
        this.form.removeAttribute("data-id");
      } else {
        // add
        app.users.addUser({
          name: this.form.elements.name.value,
          email: this.form.elements.email.value,
          code: this.form.elements.code.value,
        })
      }
    
      this.form.reset();
      // logUsers();
      app.table.createTable();
    }

    fillForm(currentUser) {
      this.form.elements.name.value = currentUser.name;
      this.form.elements.email.value = currentUser.email;
      this.form.elements.code.value = currentUser.code;
      this.form.setAttribute("data-id", currentUser.id);
    }
}