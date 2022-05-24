import React from 'react';
import { Container } from 'reactstrap';

function Winners() {
  return (
    <div className="py-8 pt-5">
      <Container fluid className="justify-content-center">
        <div className="mt-4 p-5 text-white rounded text-center">
          <h1 className="text-bold">Winners</h1>
          <p className="lead text-dark">This is page for all Winners</p>
        </div>
      </Container>
    </div>
  );
}

export default Winners;
