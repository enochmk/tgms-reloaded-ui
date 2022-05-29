import axios from 'axios';

const fetchRandomWinners = async (numberOfWinnersInput) => {
  const response = await axios.get(
    `http://localhost:8000/api/tgms2/randomizer?count=${numberOfWinnersInput}`,
  );

  return response.data;
};

export default fetchRandomWinners;
