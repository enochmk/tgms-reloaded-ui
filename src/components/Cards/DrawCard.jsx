import React from 'react';

const DrawCard = ({ title, winners }) => {
  console.log({ winners });

  return (
    <div className="card w-100 mr-1">
      <div className="card-header text-center display-4 font-weight-bold">
        {title}
      </div>
      <div className="card-body text-center">
        {winners.map((winner, index) => (
          <h4 key={index} className="font-italic font-weight-600">
            {winner.MSISDN}
          </h4>
        ))}
      </div>
    </div>
  );
};

export default DrawCard;
