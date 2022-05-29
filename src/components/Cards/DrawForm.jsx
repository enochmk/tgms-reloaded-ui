import fetchRandomWinners from '../../services/fetchRandomWinners';
import fetchStatistics from '../../services/fetchStatistics';
import { useState, useEffect, useContext } from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import { toast } from 'react-toastify';
import { DrawContext } from '../../context/DrawContext';
import resetWinners from '../../services/resetWinners';

const SPEED = 100;

const DrawForm = (props) => {
  const { setWinners, setIsLoading, isLoading } = props;
  const drawContext = useContext(DrawContext);
  const [numberOfWinnersInput, setNumberOfWinners] = useState(1);
  const [timer, setTimer] = useState(null);
  const [luckyNumber, setLuckyNumber] = useState('0000000000');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    fetchStatistics();
  }, []);

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

  const handleChange = (e) => setNumberOfWinners(e.target.value);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const startAnimation = async () => {
    const msisdnArray = drawContext.data.msisdns;
    const winnersArray = drawContext.data.winners;

    const eligibleMsisdns = msisdnArray.filter(
      (msisdn) => !winnersArray.includes(msisdn),
    );

    if (eligibleMsisdns.length === 0) return;

    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * eligibleMsisdns.length);
      const number = eligibleMsisdns[index];
      setLuckyNumber(`0${number}`);
    }, SPEED);

    setTimer(interval);
  };

  const stopAnimation = () => {
    setTimer(null);
    clearInterval(timer);
  };

  const animateWinners = async (array) => {
    let waitTimer = 10_000;
    const lastItem = array[array.length - 1];

    if (array.length > 30) {
      waitTimer = (array.length / 30) * 1000;
    }

    setIsAnimating(true);
    await sleep(waitTimer);

    setWinners(array);
    setLuckyNumber(`0${lastItem}`);
    setIsAnimating(false);
  };

  const updateStatistics = async () => {
    try {
      const data = await fetchStatistics();
      drawContext.setStatistics(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!numberOfWinnersInput) return;

    setIsAnimating(true);

    try {
      const randomNumbers = await fetchRandomWinners(numberOfWinnersInput);
      await animateWinners(randomNumbers);
      await updateStatistics();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }

      setLuckyNumber('0000000000');
      setWinners([]);
    } finally {
      setIsLoading(false);
      setIsAnimating(false);
    }
  };

  const handleReset = async (e) => {
    try {
      await resetWinners();
      await updateStatistics();

      setLuckyNumber('0000000000');
      stopAnimation();
      setNumberOfWinners(1);
      setWinners([]);
    } catch (error) {
      toast.error(error.message);
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
          <Button
            type="submit"
            className="w-75 btn-success mt-4"
            disabled={isLoading}
          >
            Generate
          </Button>
          <Button
            type="button"
            className="w-75 btn-secondary mt-4"
            onClick={handleReset}
          >
            Reset Winners
          </Button>
        </CardBody>
      </Card>
    </form>
  );
};

export default DrawForm;
