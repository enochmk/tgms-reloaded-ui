import axios from 'axios';

const HOST = process.env.REACT_APP_SERVER;

const drawWithPosition = async (position) => {
  const response = await axios.get(
    `${HOST}/api/tgms2/draw/position/${position}`,
    {
      timeout: 300000,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );

  return response.data;
};

export default drawWithPosition;
