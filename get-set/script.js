// const user = {
//   'name': 'Alex',
//   'age': 23,
  
//   getAge() {
//     console.log(this.age)
//   },

//   get userAge() {
//     return this.age;
//   },

//   set userAge(val) {
//     if (val > 100) {
//       alert('Are you serious?')
//     } else {
//       this.age = val;
//     }
    
//   }
// }

// user.getAge();

// console.log(user.userAge)

// user.userAge = 43;

// user.getAge();

// let user = {
//   name: "Тарас",
//   surname: "Мельник",

//   get fullName() {
//     return `${this.name} ${this.surname}`;
//   },

//   set fullName(value) {
//     [this.name, this.surname] = value.split(" ");
//   }
// };

// // виконується встановлення повного ім’я із заданим значенням.
// user.fullName = "Аліса Бондар";

// console.log(user.name); // Аліса
// console.log(user.surname); // Бондар


class User {

  #user

  constructor() {
    // викликає сеттер
    this.#user = [1, 6, 23];
  }
  get user() {
    console.log('getter is action')
    return this.#user;
  }

  set user(value) {

    if (value.isNan) {
      alert("Not a number");
      return;
    }
    this.#user.push(value);
  }

}

let user = new User("Іван");
// user.name = "inghj";
const good = user.user.push(3)
console.log(user.user)
const bad = user.user.push('kat')
console.log(user.user)
// user = new User(""); // Ім’я занадто коротке.