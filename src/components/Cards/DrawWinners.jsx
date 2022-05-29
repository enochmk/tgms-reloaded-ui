import { useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';
import { Card, CardBody, CardTitle } from 'reactstrap';

const TIMEOUT_DURATION = 5000;

const DrawWinners = ({ winners, isLoading }) => {
  const [width, setWidth] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
  }, []);

  useEffect(() => {
    if (winners.length > 0) {
      setCelebrate(true);

      setTimeout(() => {
        setCelebrate(false);
      }, TIMEOUT_DURATION);
    }
  }, [winners]);

  return (
    <div ref={ref}>
      {celebrate && <Confetti height={height} width={width} />}
      <Card className="scroll">
        <CardBody>
          <CardTitle tag="h2" className="text-muted">
            Winners
          </CardTitle>
          <div className="justify-content-start ">
            {isLoading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <ul
                className="list-unstyled card-columns"
                style={{ columnCount: 6 }}
              >
                {winners.map((winner, index) => (
                  <li key={index} className="text-dark">
                    0{winner}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default DrawWinners;
