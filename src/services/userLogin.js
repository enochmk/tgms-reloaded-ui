import axios from 'axios';

const userAuthentication = async (username, password) => {
  const response = await axios.post('https://10.81.9.68:9000/api/tgms2/auth', {
    username,
    password,
  });

  return response.data;
};

export default userAuthentication;
