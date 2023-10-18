import { app } from "../index.js";

export class Table {
  constructor() {
    this._tablet = document.querySelector(".table-body");
    this._thead = document.querySelector("thead");
    
    this._loadEventListenrs()
  }

  _loadEventListenrs() {
    this._thead.addEventListener("click", this.sortUsersHandler.bind(this));
  }
  createTable(items = app.users.users) {

    this.resetTable();
    for (const user of items) {
      this.createRow(user);
    }
  }
  
  createRow(user) {
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
    editBtn.addEventListener("click", this.editUser);
    td4.append(editBtn);
  
    const deleteBtn = document.createElement("button");
  
    deleteBtn.dataset.id = user.id;
    deleteBtn.setAttribute("type", "button");
    deleteBtn.classList.add("btn", "btn-danger", "btn-sm");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", this.deleteUserHandler.bind(this));
    td4.append(deleteBtn);
  
    tr.append(td4);
  
    this._tablet.append(tr);
  }

  editUser(e) {
    const currentUser = app.users.getUserById(e.target.dataset.id);
    
    const currentRow = document.querySelector(
      `.table-body > [data-id='${e.target.dataset.id}']`
    );
  
    currentRow.classList.add("row_edit");
  
    app.form.fillForm(currentUser);
  }

  deleteUserHandler(e) {

    app.users.deleteUser(e.target.dataset.id);
   

    const deletedElement = document.querySelector(
      `.table-body > [data-id='${e.target.dataset.id}']`
    );
    deletedElement.classList.add("delete");

    setTimeout(() => {
      console.log(this)
      this.createTable();
    }, 500);
  }
  
  resetTable() {
    this._tablet.innerHTML = '';
  }
  
  sortUsersHandler(e) {

    const filter = e.target.dataset.sort;
    app.users.sortUsers(filter);
    this.createTable();
  }

}
