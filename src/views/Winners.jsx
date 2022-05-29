import { useContext, useEffect } from 'react';
import { Card, CardBody, CardTitle, Container } from 'reactstrap';
import { DrawContext } from '../context/DrawContext';
import fetchStatistics from '../services/fetchStatistics';
import { toast } from 'react-toastify';

function Winners() {
  const drawContext = useContext(DrawContext);
  const winners = drawContext.data.winners;

  useEffect(() => {
    fetchStatistics()
      .then((data) => {
        drawContext.setStatistics(data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Something went wrong');
        }
      });
  }, []);

  return (
    <Container className="mt-5 pt-5">
      <div className="row justify-content-center pt-5">
        <div className="col-12">
          <Card
            className="scroll"
            // style={{ height: '100%', maxHeight: '100vh' }}
          >
            <CardBody>
              <CardTitle tag="h1" className="text-muted text-center">
                Winners
              </CardTitle>
              <div className="justify-content-start">
                {winners.length ? (
                  <ul
                    className="list-unstyled card-columns"
                    style={{ columnCount: 8 }}
                  >
                    {winners.map((winner, index) => (
                      <li key={index} className="text-dark">
                        <h4>0{winner}</h4>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h4 className="text-muted text-center display-2">
                    Nothing to show.
                  </h4>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  );
}

export default Winners;
