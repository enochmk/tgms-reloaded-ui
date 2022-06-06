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
    <div ref={ref}>
      {celebrate && <Confetti height={height} width={width} />}
      <div className="card h-100">
        <div className="card-header text-center display-4 font-weight-bold">
          Draw Result
        </div>
        <div
          className="card-body text-center d-flex-column  overflow-auto"
          style={{ height: '680px' }}
        >
          {isLoading ? (
            <span className="spinner-border spinner-border-lg text-success"></span>
          ) : (
            <div className="row justify-content-center align-content-center">
              {drawWinners.map((winner, index) => (
                <sectio key={index} className="w-100 col-md-2">
                  <div
                    className="card m-1 btn btn-white"
                    data-toggle="modal"
                    data-target={`#winner-${winner.MSISDN}`}
                  >
                    <h4 key={index} className="font-italic font-weight-500">
                      <span className="badge bg-info rounded-pill text-white mr-2">
                        {winner.POSITION}
                      </span>
                      0{winner.MSISDN}
                    </h4>
                  </div>

                  <div
                    id={`winner-${winner.MSISDN}`}
                    className="modal fade"
                    role="dialog"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header d-flex justify-content-center bg-airteltigo-danger">
                          <h4 className="modal-title text-white ">
                            POSITION: {winner.POSITION}
                          </h4>
                          <button
                            type="button"
                            className="close text-white"
                            data-dismiss="modal"
                          >
                            &times;
                          </button>
                        </div>

                        <div className="modal-body">
                          <h1 className="display-1">0{winner.MSISDN}</h1>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-danger"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </sectio>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrawWinners;
