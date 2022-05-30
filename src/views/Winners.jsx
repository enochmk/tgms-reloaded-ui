import { useContext, useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Container } from 'reactstrap';
import { toast } from 'react-toastify';
import fetchWinners from '../services/fetchWinners';
import DrawWinners from '../components/Cards/DrawWinners';

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
              <DrawWinners winners={winners} />
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  );
}

export default Winners;
