import { useState, useEffect } from 'react';
import _ from 'lodash';

const DrawCard = ({ title, winners }) => {
  const [orderedList, setOrderedList] = useState([]);

  // Order winners by position
  useEffect(() => {
    setOrderedList(_.orderBy(winners, ['POSITION'], ['asc']));
  }, [winners]);

  return (
    <div className="card w-100 mr-1 h-100 border-dark">
      <div className="card-header text-center display-4 font-weight-bold border-bottom-1 border-dark text-white bg-airteltigo-danger">
        {title}
      </div>
      <div
        className="card-body text-center overflow-auto p-1"
        style={{ height: '100%' }}
      >
        {orderedList.map((winner, index) => (
          <section key={index} className="w-100">
            <div
              className="card my-1 p-0 border-primary "
              key={index}
              data-toggle="modal"
              data-target={`#msisdn-${winner.MSISDN}`}
            >
              <div className="card-body">
                <h4 className="font-italic font-weight-600">
                  <span className="badge bg-info text-white mr-1">
                    {winner.POSITION}
                  </span>
                  0{winner.MSISDN}
                </h4>
              </div>
            </div>

            <div
              id={`msisdn-${winner.MSISDN}`}
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
          </section>
        ))}
      </div>
    </div>
  );
};

export default DrawCard;
