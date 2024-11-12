const users = [];
let id = 0;
class UserSchema {
  constructor(name, email, password) {
    this.id = ++id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
export const addUser = (name, email, password) => {
  // Write your code here
  console.log(name, email, password);
  const user = new UserSchema(name, email, password);
  users.push(user);
  return user;
};
addUser({ name: "vivek", email: "krvivi28@gmail.com", password: "vivek28@" });

export const confirmLogin = (email, password) => {
  const user = users.find((u) => u.email == email && u.password == password);
  return user;
};

export const getAllUsers = () => {
  return users;
};
