import axios from 'axios';

const HOST = process.env.REACT_APP_SERVER;

const fetchStatistics = async () => {
  const response = await axios.delete(`${HOST}/api/tgms2/winners`, {
    timeout: 300000,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return response.data;
};

export default fetchStatistics;
