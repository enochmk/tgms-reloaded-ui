import axios from 'axios';

const fetchRandomWinners = async (round) => {
  const response = await axios.get(
    `https://10.81.9.68:9000/api/tgms2/Draw?number=${round}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );

  return response.data;
};

export default fetchRandomWinners;
