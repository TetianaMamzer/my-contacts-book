import { Users } from "./users.js";
import { Filter} from "./filter.js";
import { applyForm } from "./form.js";
import { createTable } from "./table.js";

const users = new Users();
const filter = new Filter();

init();

async function init() {
  await users.getUsers();
  filter.applyFilter();
  createTable();
  applyForm();
}

export {
  users
}