export class Storag {
  static getStoragUsers() {
    const storagUsers = localStorage.getItem('users');

    if (!storagUsers) {
      return null;
    } else {
      return JSON.parse(storagUsers).length != 0 ? JSON.parse(storagUsers) : null;
    }
  } 

  static setStoragUsers(users) {
    localStorage.setItem('users', JSON.stringify(users))
  }

}