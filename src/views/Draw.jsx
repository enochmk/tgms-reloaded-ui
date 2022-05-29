import { useState, useContext } from 'react';
import { Container } from 'reactstrap';
import { DrawContext } from '../context/DrawContext';

import DrawForm from '../components/Cards/DrawForm';
import DrawWinners from '../components/Cards/DrawWinners';
import Header from '../components/Headers/Header';

function Draw() {
  const drawContext = useContext(DrawContext);
  const [winners, setWinners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Header count={drawContext.count} isLoading={drawContext.isLoading} />
      <div>
        <Container fluid className="justify-content-center">
          <div className="mt-4 p-5 text-white rounded text-center">
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
