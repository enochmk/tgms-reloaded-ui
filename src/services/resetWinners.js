import axios from 'axios';

const fetchStatistics = async () => {
  const response = await axios.delete(
    `http://10.81.9.68:8000/api/tgms2/winners`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );

  return response.data;
};

export default fetchStatistics;
