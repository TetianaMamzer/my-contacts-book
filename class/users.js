export class Users {
  
  constructor() {
    this._users = [];
  }

  async getUsers() {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");
  
    if (response.ok) {
      let json = await response.json();
      let editionalUsers = json.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        code: user.address.zipcode.slice(-4),
      }));
  
      this._users.push(...editionalUsers);
      
    } else {
      console.log("HTTP-Error: " + response.status);
    }
  }
  
  filterUsers(filter) {
    return this._users.filter(user => user.name.toLowerCase().includes(filter.toLowerCase()));
  }

  sortUsers(sort) {
    let sortFunc;
  
    if (typeof(this._users[0][sort]) == 'number') {
  
      sortFunc = (a, b) => a[sort] - b[sort];
      
    } else {
  
      sortFunc = (a, b) => a[sort].localeCompare(b[sort]);
  
    }
    this._users.sort(sortFunc);
  }

  updateUser(user) {
    const currentUserIndex = this._users.findIndex(
      (item) => item.id == user.id
    );
  
    this._users[currentUserIndex].name = user.name;
    this._users[currentUserIndex].email = user.email;
    this._users[currentUserIndex].code = user.code;
  }

  addUser(user) {
    user.id = Math.max(...this._users.map((item) => item.id)) + 1;
  
    this._users.push(user);
  }

  deleteUser(id) {
    const indexUser = this._users.findIndex((user) => user.id == id);
    
    this._users.splice(indexUser, 1);
  }
  getUserById(id) {
    return this._users.find((item) => item.id == id);
  }
}
