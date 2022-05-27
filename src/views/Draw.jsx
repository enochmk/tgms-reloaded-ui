import { useState } from 'react';
import { Container } from 'reactstrap';

import DrawForm from '../components/Cards/DrawForm';
import DrawWinners from '../components/Cards/DrawWinners';

const MSISDNs = [
  568740323, 266747918, 263176821, 266122404, 263764486, 579022559, 266416416,
  563565304, 573270842, 579530469, 263409279, 569088470,
];

function Draw() {
  const [winners, setWinners] = useState([...MSISDNs]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="py-8 pt-5">
      <Container fluid className="justify-content-center">
        <div className="mt-4 p-5 text-white rounded text-center">
          <div className="row justify-content-center">
            <div className="col-8">
              <DrawWinners winners={winners} />
            </div>
            <div className="col-4">
              <DrawForm
                winners={winners}
                setWinners={setWinners}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Draw;
