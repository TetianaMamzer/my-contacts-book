import { debounce } from './library.js';
import { users } from './script.js';
import { createTable } from './table.js';

export class Filter {
  applyFilter() {
    const search = document.querySelector('[type="search"]');
  
    search.addEventListener('input', debounce(() => filterUsersHandler()));
    
    function filterUsersHandler() {
      let findeUsers = users.filterUsers(search.value);
    
      createTable(findeUsers);
    }
  }
}

