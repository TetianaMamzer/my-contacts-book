const users = [];

async function getUsers() {
  let response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (response.ok) {
    let json = await response.json();
    let editionalUsers = json.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      code: user.address.zipcode.slice(-4),
    }));

    users.push(...editionalUsers);
    console.log(users);
  } else {
    console.log("HTTP-Error: " + response.status);
  }
}

function filterUsers(filter) {
  return users.filter(user => user.name.toLowerCase().includes(filter.toLowerCase()));
}

function sortUsers(sort) {
  let sortFunc;

  if (typeof(users[0][sort]) == 'number') {

    sortFunc = (a, b) => a[sort] - b[sort];
    
  } else {

    sortFunc = (a, b) => a[sort].localeCompare(b[sort]);

  }
  users.sort(sortFunc);
}

function updateUser(user) {
  const currentUserIndex = users.findIndex(
    (item) => item.id == user.id
  );

  users[currentUserIndex].name = user.name;
  users[currentUserIndex].email = user.email;
  users[currentUserIndex].code = user.code;
}

function addUser(user) {
  user.id = Math.max(...users.map((item) => item.id)) + 1;

  users.push(user);
}

function deleteUser(id) {
  const indexUser = users.findIndex((user) => user.id == id);
  
  users.splice(indexUser, 1);
}

function getUserById(id) {
  return users.find((item) => item.id == id);

}
export {users, getUsers, filterUsers, sortUsers, updateUser, addUser, deleteUser, getUserById }