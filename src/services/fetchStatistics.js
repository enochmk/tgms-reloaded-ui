import axios from 'axios';

const fetchStatistics = async () => {
  const response = await axios.get(
    `https://10.81.9.68:9000/api/tgms2/statistics`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );

  return response.data;
};

export default fetchStatistics;
