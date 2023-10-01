import { users, getUsers, sortUsers } from "./users.js";
import { applyFilter } from "./filter.js";

// ------ ELEMENTS

const form = document.forms.addUser;
const tablet = document.querySelector(".table-body");
const thead = document.querySelector("thead");

const nameIsValid = document.querySelector(".name-valid");
const emailIsValid = document.querySelector(".email-valid");
const codeIsValid = document.querySelector(".code-valid");

// ------ INIT
init();

// ------ EVENTS
thead.addEventListener("click", sortUsersHandler);

function formHandle(e) {
  e.preventDefault();
  // console.log(e.target)
  // update
  if (form.hasAttribute("data-id")) {
    const currentUserIndex = users.findIndex(
      (user) => user.id == form.getAttribute("data-id")
    );

    users[currentUserIndex].name = form.elements.name.value;
    users[currentUserIndex].email = form.elements.email.value;
    users[currentUserIndex].code = form.elements.code.value;

    form.removeAttribute("data-id");
  } else {
    // add
    const user = {
      id: Math.max(...users.map((item) => item.id)) + 1,
      name: form.elements.name.value,
      email: form.elements.email.value,
      code: form.elements.code.value,
    };

    console.log(Math.max(...users.map((item) => item.id)) + 1);
    console.log(users);
    users.push(user);
  }

  form.reset();
  // logUsers();
  createTable();
}
// ------ FUNCTIONS

// function getInfo() {
//   return `
//     id: ${this.id};
//     name: ${this.name};
//     email: ${this.email};
//     code: ${this.code};
//   `;
// }

async function init() {
  await getUsers();
  applyFilter();
  createTable();
}

// function logUsers() {
//   for (const user of users) {
//     // console.clear();
//     console.log(getInfo.apply(user));
//   }
// }

function createTable(items = users) {
  resetTable();
  for (const user of items) {
    createRow(user);
  }
}

function createRow(user) {
  const tr = document.createElement("tr");
  tr.dataset.id = user.id;
  const th = document.createElement("th");
  th.setAttribute("scope", "row");
  th.innerText = user.id;
  tr.append(th);

  const td1 = document.createElement("td");
  td1.innerText = user.name;
  tr.append(td1);

  const td2 = document.createElement("td");
  td2.innerText = user.email;
  tr.append(td2);

  const td3 = document.createElement("td");
  td3.innerHTML = user.code;
  tr.append(td3);

  const td4 = document.createElement("td");
  const editBtn = document.createElement("button");
  // editBtn.setAttribute('data-id', user.id);
  editBtn.dataset.id = user.id;
  editBtn.setAttribute("type", "button");
  editBtn.classList.add("btn", "btn-dark", "btn-sm", "me-2");
  editBtn.innerText = "Edit";
  editBtn.addEventListener("click", editUser);
  td4.append(editBtn);

  const deleteBtn = document.createElement("button");
  // deleteBtn.setAttribute('data-id', user.id);
  deleteBtn.dataset.id = user.id;
  deleteBtn.setAttribute("type", "button");
  deleteBtn.classList.add("btn", "btn-danger", "btn-sm");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", deleteUser);
  td4.append(deleteBtn);

  tr.append(td4);

  tablet.append(tr);
}

// Array.from( document.forms).forEach(form => {
//   form.addEventListener('submit', event => {
//     if (!form.checkValidity()) {
//       event.preventDefault()
//       event.stopPropagation()
//       form.classList.add('was-validated')
//     } else {
//       form.classList.remove('was-validated');
//       formHandle(event);
//     }
//   }, false)
// })

// Array.from(document.forms).forEach(form => {

const name = form.elements.name;
const email = form.elements.email;
const code = form.elements.code;

name.addEventListener("blur", function () {
  const resultValidation = validateName(name.value);
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

function validateName(value) {
  const regName = /^[ \a-zA-Z0-9_-]{3,20}$/;
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

email.addEventListener("blur", function () {
  const resultValidation = validateEmail(email.value);
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

function validateEmail(value) {
  const regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
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

code.addEventListener("blur", function () {
  const resultValidation = validateCode(code.value);
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

function validateCode(value) {
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

form.addEventListener("submit", (event) => {
  event.preventDefault();
  event.stopPropagation();
  const valName = validateName(name.value);
  const valCode = validateCode(code.value);
  const valEmail = validateEmail(email.value);

  if (valName.result && valCode.result && valEmail.result) {
    formHandle(event);
    code.classList.remove("is-valid", "is-invalid");
    codeIsValid.classList.remove("valid-feedback", "invalid-feedback");
    name.classList.remove("is-valid", "is-invalid");
    nameIsValid.classList.remove("valid-feedback", "invalid-feedback");
    email.classList.remove("is-valid", "is-invalid");
    emailIsValid.classList.remove("valid-feedback", "invalid-feedback");
  } else {
    alert("Please fill in all fields!");
  }
});

function editUser(e) {
  const currentUser = users.find((item) => item.id == e.target.dataset.id);
  const currentRow = document.querySelector(
    `[data-id='${e.target.dataset.id}']`
  );

  currentRow.classList.add("row_edit");

  fillForm(currentUser);
  form.setAttribute("data-id", currentUser.id);

  // const indexUser = users.findIndex(user => user.id == e.target.dataset.id);
  // const currentUser = users[indexUser];

  // form.elements.button.dataset.submit = 'false';

  // form.elements.name.value = currentUser.name;
  // form.elements.email.value = currentUser.email;
  // form.elements.code.value = currentUser.code;
}

function fillForm(currentUser) {
  form.elements.name.value = currentUser.name;
  form.elements.email.value = currentUser.email;
  form.elements.code.value = currentUser.code;
}
function deleteUser(e) {
  console.log(e);
  const indexUser = users.findIndex((user) => user.id == e.target.dataset.id);
  console.log(indexUser);

  const deletedElement = tablet.querySelector(
    `[data-id="${e.target.dataset.id}"]`
  );
  deletedElement.classList.add("delete");

  setTimeout(() => {
    users.splice(indexUser, 1);
    createTable();
  }, 500);
}

function resetTable() {
  // tablet.innerHTML = '';
  const rows = tablet.querySelectorAll("tr");

  for (const row of rows) {
    row.remove();
  }
}

function sortUsersHandler(e) {
  const filter = e.target.dataset.sort;
  sortUsers(filter);
  createTable();
}

export { createTable };
