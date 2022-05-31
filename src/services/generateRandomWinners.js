import axios from 'axios';

const fetchRandomWinners = async (round) => {
  const response = await axios.get(
    `http://localhost:8000/api/tgms2/Draw?number=${round}`,
  );

  return response.data;
};

export default fetchRandomWinners;
