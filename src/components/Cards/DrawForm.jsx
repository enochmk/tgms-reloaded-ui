import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import { toast } from 'react-toastify';
import { DrawContext } from '../../context/DrawContext';

const SPEED = 100;

const DrawForm = (props) => {
  const { setWinners, winners, setIsLoading, isLoading } = props;
  const drawContext = useContext(DrawContext);
  const [numberOfWinnersInput, setNumberOfWinners] = useState(1);
  const [timer, setTimer] = useState(null);
  const [luckyNumber, setLuckyNumber] = useState('0000000000');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      setIsLoading(true);
      startAnimation();
    }

    if (!isAnimating) {
      setIsLoading(false);
      stopAnimation();
    }

    return () => {
      clearInterval(timer);
    };
  }, [isAnimating]);

  useEffect(() => {
    if (winners.length) {
      const lastItem = winners[winners.length - 1];
      setLuckyNumber(`0${lastItem}`);
    }
  }, [winners]);

  const handleChange = (e) => setNumberOfWinners(e.target.value);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const startAnimation = async () => {
    // const msisdnArray = drawContext.data.msisdns;
    const msisdnArray = ['560043149', '263435178', '570025938'];

    if (msisdnArray.length === 0) return;

    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * msisdnArray.length);
      const number = msisdnArray[index];
      setLuckyNumber(`0${number}`);
    }, SPEED);

    setTimer(interval);
  };

  const stopAnimation = () => {
    setTimer(null);
    clearInterval(timer);
  };

  const fetchRandomNumbers = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/tgms2/randomizer?count=${numberOfWinnersInput}`,
    );

    return response.data;
  };

  const animateWinners = async (array) => {
    const data = [];
    for (let index = 0; index < array.length; index++) {
      setIsAnimating(true);

      data.push(array[index]);
      await sleep(5000);

      setWinners(data);
      setIsAnimating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!numberOfWinnersInput) return;

    try {
      const randomNumbers = await fetchRandomNumbers();
      await animateWinners(randomNumbers);
    } catch (error) {
      toast.error(error.message);
      setLuckyNumber('0000000000');
      setWinners([]);
    } finally {
      setIsLoading(false);
      setIsAnimating(false);
    }
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
                value={numberOfWinnersInput}
                disabled={isLoading}
                required
              />
            </div>
          </div>
          <Button className="w-75 btn-success mt-4">Generate</Button>
          <Button className="w-75 mt-4" type="button" onClick={stopAnimation}>
            Stop Animation
          </Button>
        </CardBody>
      </Card>
    </form>
  );
};

export default DrawForm;
