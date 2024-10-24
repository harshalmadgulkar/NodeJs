export const users = [
  { id: 1, email: "krvivi28@gmail.com", password: "vivek28@" },
  { id: 24, email: "test@gmail.com", password: "test" },
];

export const handleSingUpModel = (user) => {
  let id = users.length + 1;
  users.push({ ...user, id: id });
};
export const handleLoginModel = (user) => {
  let status = false;
  users.forEach((userData) => {
    if (user.email === userData.email && user.password === userData.password)
      status = true;
  });
  return status;
};
