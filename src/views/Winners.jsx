import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Container } from 'reactstrap';
import { toast } from 'react-toastify';

import fetchWinners from '../services/fetchWinners';
import DrawCard from '../components/Cards/WinnerCard';
import BackgroundWallpaper from '../assets/img/wallpapers/Winners.png';

const wallpaperStyle = {
  backgroundImage: 'url(' + BackgroundWallpaper + ')',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '100%',
  width: '100%',
};

function Winners() {
  const [winners, setWinners] = useState({
    firstRound: [],
    secondRound: [],
    thirdRound: [],
    fourthRound: [],
    fifthRound: [],
    sixthRound: [],
    seventhRound: [],
  });

  useEffect(() => {
    fetchWinners()
      .then((data) => {
        setWinners(data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Something went wrong');
        }
      });
  }, []);

  return (
    <div style={{ ...wallpaperStyle, marginTop: '8%' }}>
      <Container fluid className="h-100">
        <Card className="h-75 mb-5">
          <CardBody>
            <CardTitle tag="h1" className="text-muted text-center display-2">
              WINNERS
            </CardTitle>
            <div className="row flex-nowrap" style={{ height: '500px' }}>
              <DrawCard title="GHS 5,000" winners={winners.firstRound} />
              <DrawCard title="GHS 2,000" winners={winners.secondRound} />
              <DrawCard title="GHS 1,000" winners={winners.thirdRound} />
              <DrawCard title="GHS 500" winners={winners.fourthRound} />
              <DrawCard title="GHS 300" winners={winners.fifthRound} />
              <DrawCard title="GHS 200" winners={winners.sixthRound} />
              <DrawCard title="GHS 100" winners={winners.seventhRound} />
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

export default Winners;
