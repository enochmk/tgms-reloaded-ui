import axios from 'axios';

const userAuthentication = async (username, password) => {
  const response = await axios.post('http://localhost:8000/api/tgms2/auth', {
    username,
    password,
  });

  return response.data;
};

export default userAuthentication;
