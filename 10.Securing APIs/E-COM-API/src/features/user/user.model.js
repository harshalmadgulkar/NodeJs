export default class UserModel {
  constructor(id, name, email, password, type) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }

  static signUp(name, email, password, type) {
    const id = users.length + 1;
    const newUser = new UserModel(id, name, email, password, type);
    users.push(newUser);
    return newUser;
  }

  static signIn(email, password) {
    const user = users.find(
      (user) => user.email == email && user.password == password
    );
    return user;
  }

  static getAll() {
    return users;
  }
}

var users = [
  {
    id: 1,
    name: "Seller User",
    email: "seller@ecom.com",
    password: "password1",
    type: "seller",
  },
];
