// Please don't change the pre-written code
// Import the necessary modules here

export const users = [
  { id: 1, name: "vivek", email: "krvivi28@gmail.com", password: "vivek28@" },
];

export const registerUser = (user) => {
  // Write your code here
  const newUser = {
    id: users.length + 1,
    name: user.name,
    email: user.email,
    password: user.password,
  };
  users.push(newUser);
};

export const authenticateUser = (reqUser) => {
  // Write your code here
  const user = users.find(
    (u) => u.email === reqUser.email && u.password === reqUser.password
  );
  if (user) {
    return true;
  } else {
    return false;
  }
};
