import { useState } from 'react';
import { Container } from 'reactstrap';

import DrawForm from '../components/Cards/DrawForm';
import DrawWinners from '../components/Cards/DrawWinners';

function Draw() {
  const [winners, setWinners] = useState([]);

  return (
    <div className="py-8 pt-5">
      <Container fluid className="justify-content-center">
        <div className="mt-4 p-5 text-white rounded text-center">
          <div className="row justify-content-center">
            <div className="col-8">
              <DrawWinners winners={winners} />
            </div>
            <div className="col-4">
              <DrawForm winners={winners} setWinners={setWinners} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Draw;
