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
        <div className="card-header text-center display-4 font-weight-bold text-primary">
          Draw Result
        </div>
        <div
          className="card-body text-center d-flex-column overflow-auto"
          style={{ height: '480px' }}
        >
          {isLoading ? (
            <span className="spinner-border spinner-border-lg text-success"></span>
          ) : (
            <div className="row justify-content-center align-content-center">
              {drawWinners.map((winner, index) => (
                <section key={index} className="w-25">
                  <div
                    className="card m-1 btn btn-white"
                    data-toggle="modal"
                    data-target={`#winner-${winner.MSISDN}`}
                  >
                    <h1
                      key={index}
                      className="font-italic font-weight-700 text-primary"
                    >
                      <span className="badge bg-danger rounded-pill text-white text-lg align-content-center justify-content-center align-items-center my-2 mr-2">
                        {winner.POSITION}
                      </span>
                      0{winner.MSISDN}
                    </h1>
                  </div>

                  <div
                    id={`winner-${winner.MSISDN}`}
                    className="modal fade"
                    role="dialog"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header d-flex justify-content-center bg-airteltigo-danger">
                          <h2 className="modal-title text-white text-lg ">
                            POSITION: {winner.POSITION}
                          </h2>
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
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrawWinners;
