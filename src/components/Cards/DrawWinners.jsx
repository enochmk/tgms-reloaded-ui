import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

const DrawWinners = ({ winners }) => {
  return (
    <div>
      <Card className="scroll">
        <CardBody>
          <CardTitle tag="h2" className="text-muted">
            Winners
          </CardTitle>
          <div className="justify-content-start ">
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
          </div>
        </CardBody>
      </Card>
      ;
    </div>
  );
};

export default DrawWinners;
