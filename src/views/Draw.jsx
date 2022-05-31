import { useState, useContext } from 'react';
import { Container } from 'reactstrap';

import { DrawContext } from '../context/DrawContext';
import DrawForm from '../components/Cards/DrawForm';
import DrawWinners from '../components/Cards/DrawWinners';
import Header from '../components/Headers/Header';

function Draw() {
  const drawContext = useContext(DrawContext);
  const [isLoading, setIsLoading] = useState(false);
  const [drawWinners, setDrawWinners] = useState([]);

  return (
    <>
      <Header count={drawContext.count} isLoading={drawContext.isLoading} />
      <Container fluid className="justify-content-center">
        <div className="mt-4 p-5 rounded text-center">
          <div className="row justify-content-center">
            <div className="col-9">
              <DrawWinners drawWinners={drawWinners} isLoading={isLoading} />
            </div>
            <div className="col-3">
              <DrawForm
                drawWinners={drawWinners}
                setDrawWinners={setDrawWinners}
                setIsLoading={setIsLoading}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Draw;
