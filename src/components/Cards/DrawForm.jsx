import { useState, useEffect, useContext } from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import { toast } from 'react-toastify';
import fetchRandomWinners from '../../services/generateRandomWinners';
import fetchStatistics from '../../services/fetchStatistics';
import { DrawContext } from '../../context/DrawContext';
import resetWinners from '../../services/resetWinners';

const SPEED = 100;

const DrawForm = (props) => {
  const { setDrawWinners, setIsLoading, isLoading } = props;
  const [numberOfWinnersInput, setNumberOfWinners] = useState(1);
  const [timer, setTimer] = useState(null);
  const [luckyNumber, setLuckyNumber] = useState('0000000000');
  const [isAnimating, setIsAnimating] = useState(false);
  const drawContext = useContext(DrawContext);

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

  const animateWinners = async (drawResultArray) => {
    let waitTimer = 3_500;
    const lastItem = drawResultArray[drawResultArray.length - 1];

    if (drawResultArray.length > 30) {
      waitTimer = (drawResultArray.length / 30) * 1_000;
    }

    setIsAnimating(true);
    await sleep(waitTimer);

    setDrawWinners(drawResultArray);
    setLuckyNumber(`0${lastItem.MSISDN}`);
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
    setDrawWinners([]);

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
      setDrawWinners([]);
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
      setDrawWinners([]);
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
            <div className="row">
              <label className="w-100 text-muted text-center mr-2 align-self-center">
                Enter number of winners:
              </label>
            </div>
            <div className="row container ">
              <select
                className="form-control"
                onChange={handleChange}
                disabled={isLoading}
                required
              >
                <option></option>
                <option value="1">First Draw</option>
                <option value="2">Second Draw</option>
                <option value="3">Third Draw</option>
                <option value="4">fourth Draw</option>
                <option value="5">Fiveth Draw</option>
                <option value="6">Sixth Draw</option>
                <option value="7">Seventh Draw</option>
              </select>
            </div>
          </div>
          <Button
            type="submit"
            className="w-100 btn-success mt-4"
            disabled={isLoading}
          >
            Generate
          </Button>
          <Button
            type="button"
            className="w-100 btn-secondary mt-4"
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
