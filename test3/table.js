import { fillForm } from "./form.js";
import { users } from "./script.js";

const tablet = document.querySelector(".table-body");
const thead = document.querySelector("thead");

thead.addEventListener("click", sortUsersHandler);

function createTable(items = users._users) {
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

  editBtn.dataset.id = user.id;
  editBtn.setAttribute("type", "button");
  editBtn.classList.add("btn", "btn-dark", "btn-sm", "me-2");
  editBtn.innerText = "Edit";
  editBtn.addEventListener("click", editUser);
  td4.append(editBtn);

  const deleteBtn = document.createElement("button");

  deleteBtn.dataset.id = user.id;
  deleteBtn.setAttribute("type", "button");
  deleteBtn.classList.add("btn", "btn-danger", "btn-sm");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", deleteUserHandler);
  td4.append(deleteBtn);

  tr.append(td4);

  tablet.append(tr);
}

function editUser(e) {
  const currentUser = users.getUserById(e.target.dataset.id);

  const currentRow = document.querySelector(
    `.table-body > [data-id='${e.target.dataset.id}']`
  );

  currentRow.classList.add("row_edit");

  fillForm(currentUser);
}
 
function deleteUserHandler(e) {

  users.deleteUser(e.target.dataset.id);
 

  const deletedElement = tablet.querySelector(
    `[data-id="${e.target.dataset.id}"]`
  );
  deletedElement.classList.add("delete");

  setTimeout(() => {
    createTable();
  }, 500);
}

function resetTable() {
  tablet.innerHTML = '';
}

function sortUsersHandler(e) {
  const filter = e.target.dataset.sort;
  users.sortUsers(filter);
  createTable();
}
export {
  createTable,
}