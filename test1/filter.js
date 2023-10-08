import { debounce } from './library.js';
import { filterUsers } from './users.js';
import { createTable } from './table.js';

export const applyFilter = () => {
  const search = document.querySelector('[type="search"]');

  search.addEventListener('input', debounce(() => filterUsersHandler()));
  
  function filterUsersHandler() {
    let findeUsers = filterUsers(search.value);
  
    createTable(findeUsers);
  }
}
