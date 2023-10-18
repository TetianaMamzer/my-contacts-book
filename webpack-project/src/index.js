import './style.scss';

import { Users } from "./components/users.js";
import { Filter} from "./components/filter.js";
import { Table } from "./components/table.js";
import { Form } from "./components/form.js";

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