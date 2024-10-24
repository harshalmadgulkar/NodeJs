export default class UserModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static add(name, email, password) {
    let newUser = new UserModel(users.length + 1, name, email, password);
    users.push(newUser);
  }

  static isValidUser(email, password) {
    return users.find((u) => u.email == email && u.password == password);
  }
}

var users = [new UserModel(1, "John Doe", "madgulkar@gmail.com", "abcd")];
