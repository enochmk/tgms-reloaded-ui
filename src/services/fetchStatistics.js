import axios from 'axios';

const fetchStatistics = async () => {
  const response = await axios.get(
    `http://localhost:8000/api/tgms2/statistics`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );

  return response.data;
};

export default fetchStatistics;
