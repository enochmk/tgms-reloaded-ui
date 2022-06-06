import React from 'react';

const DrawCard = ({ title, winners }) => {
  return (
    <div className="card w-100 mr-1 h-100" style={{ maxHeight: '100%' }}>
      <div className="card-header text-center display-4 font-weight-bold">
        {title}
      </div>
      <div className="card-body text-center overflow-auto">
        {winners.map((winner, index) => (
          <h4 key={index} className="font-italic font-weight-600">
            <span className="badge bg-info text-white mr-2">
              {winner.POSITION}
            </span>
            0{winner.MSISDN}
          </h4>
        ))}
      </div>
    </div>
  );
};

export default DrawCard;
