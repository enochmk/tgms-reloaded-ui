import { useState } from 'react';
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from 'reactstrap';

function Draw() {
  const [luckyNumber, setLuckyNumber] = useState('0000000000');

  return (
    <div className="py-8 pt-5">
      <Container fluid className="justify-content-center">
        <div className="mt-4 p-5 text-white rounded text-center">
          <div className="row justify-content-center">
            <div className="col-8"></div>
            <div className="col-4">
              <form>
                <Card>
                  <CardBody>
                    <CardTitle tag="h2" className="text-dark">
                      Weekly Winners Draw
                    </CardTitle>
                    <section className="my-5">
                      <h4 className="display-1">{luckyNumber}</h4>
                    </section>
                    <div class="form-group my-2">
                      <div className="d-flex flex-row justify-content-center">
                        <label className="text-muted mr-2 align-self-center">
                          Enter number of winners:
                        </label>
                        <input type="number" className="form-control w-25" />
                      </div>
                    </div>
                    <Button className="w-75 btn-success mt-4">Generate</Button>
                  </CardBody>
                </Card>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Draw;
