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

export {users, getUsers, filterUsers, sortUsers }