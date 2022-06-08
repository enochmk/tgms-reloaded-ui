import axios from 'axios';

const HOST = process.env.REACT_APP_SERVER;

const fetchRandomWinners = async (round) => {
  const response = await axios.get(`${HOST}/api/tgms2/Draw?number=${round}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return response.data;
};

export default fetchRandomWinners;
