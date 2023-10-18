import { debounce } from './library.js';
import { app } from '../index.js';

export class Filter {
  constructor() {
    this._filterInput = document.querySelector('[type="search"]');
    this._loadEventListenrs();
    
  }

  _loadEventListenrs() {
  this._filterInput.addEventListener('input', debounce(() => this._filterUsersHandler()));
  }
  
  _filterUsersHandler() {
    let findeUsers = app.users.filterUsers(this._filterInput.value);
  
    app.table.createTable(findeUsers);
  }
}

