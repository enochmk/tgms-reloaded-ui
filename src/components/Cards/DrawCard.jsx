import React from 'react';

const DrawCard = ({ title, winners }) => {
  return (
    <div class="card w-25">
      <div class="card-header text-center display-4 font-weight-bold">
        {title}
      </div>
      <div class="card-body text-center">
        {winners.length &&
          winners.map((winner, index) => (
            <h4 key={index} className="font-italic font-weight-600">
              {winner.MSISDN}
            </h4>
          ))}
      </div>
    </div>
  );
};

export default DrawCard;
