import { useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';

const TIMEOUT_DURATION = 3500;

const DrawWinners = ({ drawWinners, isLoading }) => {
  const [width, setWidth] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  // get the width and height of the component
  useEffect(() => {
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
  }, []);

  // celebrate when drawWinners change
  useEffect(() => {
    if (drawWinners.length) {
      setCelebrate(true);

      setTimeout(() => {
        setCelebrate(false);
      }, TIMEOUT_DURATION);
    }
  }, [drawWinners]);

  return (
    <div ref={ref} className="h-100">
      {celebrate && <Confetti height={height} width={width} />}
      <div className="card h-100  mr-1">
        <div className="card-header text-center display-4 font-weight-bold">
          Draw Result
        </div>
        <div className="card-body text-center d-flex-column flex-grow-1">
          {isLoading ? (
            <span className="spinner-border spinner-border-lg text-success"></span>
          ) : (
            <div className="row justify-content-center align-content-center h-100">
              {drawWinners.map((winner, index) => (
                <div className="card col-md-2 m-1">
                  <h4 key={index} className="font-italic font-weight-500">
                    <span class="badge bg-info rounded-pill text-white mr-2">
                      {winner.POSITION}
                    </span>
                    0{winner.MSISDN}
                  </h4>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrawWinners;
