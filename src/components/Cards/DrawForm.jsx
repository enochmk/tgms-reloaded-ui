import { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';

const MSISDNs = [
  568740323, 266747918, 263176821, 266122404, 263764486, 579022559, 266416416,
  563565304, 573270842, 579530469, 263409279, 569088470,
];

const SPEED = 50;

const DrawForm = ({ setWinners }) => {
  const [numberOfWinners, setNumberOfWinners] = useState(0);
  const [timer, setTimer] = useState(null);
  const [luckyNumber, setLuckyNumber] = useState('0000000000');
  const [isSpinning, setIsSpinning] = useState(false);
  const [listNumbers, setListNumber] = useState(MSISDNs);

  const handleChange = (e) => {
    setNumberOfWinners(e.target.value);
  };

  const generateRandomNumberFromArray = (list) => {
    const index = Math.floor(Math.random() * list.length);
    const number = list[index];
    return number;
  };

  useEffect(() => {
    if (isSpinning) {
      animateNumbers();
    }

    return () => clearInterval(timer);
  }, [isSpinning]);

  const animateNumbers = async () => {
    const interval = setInterval(() => {
      const number = generateRandomNumberFromArray(listNumbers);
      setLuckyNumber(`0${number}`);
    }, SPEED);

    setTimer(interval);
  };

  const stopAnimation = () => {
    setIsSpinning(false);
    clearInterval(timer);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWinners([]);
    setIsSpinning(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardBody>
          <CardTitle tag="h2" className="text-dark">
            Weekly Winners Draw
          </CardTitle>
          <section className="my-5">
            <h4 className="display-1">{luckyNumber}</h4>
          </section>
          <div className="form-group my-2">
            <div className="d-flex flex-row justify-content-center">
              <label className="text-muted mr-2 align-self-center">
                Enter number of winners:
              </label>
              <input
                type="number"
                className="form-control w-25"
                onChange={handleChange}
                value={numberOfWinners}
                disabled={isSpinning}
              />
            </div>
          </div>
          <Button className="w-75 btn-success mt-4">Generate</Button>
          <Button className="w-75  mt-4" type="button" onClick={stopAnimation}>
            Stop Animation
          </Button>
        </CardBody>
      </Card>
    </form>
  );
};

export default DrawForm;
