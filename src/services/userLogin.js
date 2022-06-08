import axios from 'axios';

const HOST = process.env.REACT_APP_SERVER;

const userAuthentication = async (username, password) => {
  const response = await axios.post(`${HOST}/api/tgms2/auth`, {
    username,
    password,
  });

  return response.data;
};

export default userAuthentication;
