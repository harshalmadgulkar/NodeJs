import axios from 'axios';

export const userModel = async () => {
  const response = await axios.get('https://dummyjson.com/users');
  const users = await response.data.users;
  // console.log(users);
  return users;
};
