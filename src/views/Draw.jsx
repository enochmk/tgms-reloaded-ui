import { useState, useContext, useEffect } from 'react';
import { Container } from 'reactstrap';
import { DrawContext } from '../context/DrawContext';
import { toast } from 'react-toastify';

import DrawForm from '../components/Cards/DrawForm';
import DrawWinners from '../components/Cards/DrawWinners';
import Header from '../components/Headers/Header';
import fetchWinners from '../services/fetchWinners';

function Draw() {
  const drawContext = useContext(DrawContext);
  const [isLoading, setIsLoading] = useState(false);
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
    <>
      <Header count={drawContext.count} isLoading={drawContext.isLoading} />
      <div>
        <Container fluid className="justify-content-center">
          <div className="mt-4 p-5 rounded text-center">
            <div className="row justify-content-center">
              <div className="col-8">
                <DrawWinners winners={winners} isLoading={isLoading} />
              </div>
              <div className="col-4">
                <DrawForm
                  winners={winners}
                  setWinners={setWinners}
                  setIsLoading={setIsLoading}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Draw;
