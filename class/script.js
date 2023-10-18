import { Users } from "./users.js";
import { Filter} from "./filter.js";
import { Table } from "./table.js";
import { Form } from "./form.js";

class App {
  constructor() {
    this.users = new Users();
    this.filter = new Filter();
    this.table = new Table();
    this.form = new Form();

    this._init();
  }

  async _init() {
    await this.users.getUsers();
    this.table.createTable();
  }
  
}

export const app = new App();