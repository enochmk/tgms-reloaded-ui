import axios from 'axios';

const userAuthentication = async (username, password) => {
  const response = await axios.post('http://10.81.9.68:8000/api/tgms2/auth', {
    username,
    password,
  });

  return response.data;
};

export default userAuthentication;
