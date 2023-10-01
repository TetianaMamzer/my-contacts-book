import { users } from "./users.js";
import { createTable } from "./script.js";
const form = document.forms.addUser;

function formHandle(e) {
  e.preventDefault();

 console.log(users)
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

    users.push(user);
  }

  form.reset();
  // logUsers();
  createTable();
}

export {
  formHandle
}

