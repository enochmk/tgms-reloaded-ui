import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Container } from 'reactstrap';
import { toast } from 'react-toastify';
import fetchWinners from '../services/fetchWinners';
import DrawCard from '../components/Cards/DrawCard';

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
    <Container fluid className="mt-5 pt-5">
      <div className="row justify-content-center pt-5">
        <div className="col-12">
          <Card className="scroll">
            <CardBody>
              <CardTitle tag="h1" className="text-muted text-center">
                Winners
              </CardTitle>
              <div className="row flex-nowrap">
                <DrawCard title="1st" winners={winners.firstRound} />
                <DrawCard title="2nd" winners={winners.secondRound} />
                <DrawCard title="3rd" winners={winners.thirdRound} />
                <DrawCard title="4th-13th" winners={winners.fourthRound} />
                <DrawCard title="14th-33rd" winners={winners.fifthRound} />
                <DrawCard title="34th-93rd" winners={winners.sixthRound} />
                <DrawCard title="94th-363rd" winners={winners.seventhRound} />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  );
}

export default Winners;
