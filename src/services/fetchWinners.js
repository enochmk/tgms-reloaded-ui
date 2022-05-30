import axios from 'axios';

const fetchWinners = async (numberOfWinnersInput) => {
  const response = await axios.get(`http://localhost:8000/api/tgms2/winners`);

  return response.data;
};

export default fetchWinners;
