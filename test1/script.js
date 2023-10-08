import { getUsers} from "./users.js";
import { applyFilter } from "./filter.js";
import { applyForm } from "./form.js";
import { createTable } from "./table.js";

init();

async function init() {
  await getUsers();
  applyFilter();
  createTable();
  applyForm();
}