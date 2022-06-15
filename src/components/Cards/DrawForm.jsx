import _ from 'lodash';
import { useState, useEffect, useContext } from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import { toast } from 'react-toastify';

import fetchRandomWinners from '../../services/generateRandomWinners';
import fetchStatistics from '../../services/fetchStatistics';
import { DrawContext } from '../../contexts/DrawContext';
import resetWinners from '../../services/resetWinners';

const SPEED = 50;
let WAIT_TIMER = 15_000;
const selectOptions = [
  { name: 'First Draw', value: '1', disabled: false },
  { name: 'Second Draw', value: '2', disabled: false },
  { name: 'Third Draw', value: '3', disabled: false },
  { name: 'Fourth Draw', value: '4', disabled: false },
  { name: 'Fiveth Draw', value: '5', disabled: false },
  { name: 'Sixth Draw', value: '6', disabled: false },
  { name: 'Seventh Draw', value: '7', disabled: false },
];

const DrawForm = (props) => {
  const { setDrawWinners, setIsLoading, drawWinners, isLoading } = props;
  const [numberOfWinnersInput, setNumberOfWinners] = useState('');
  const [timer, setTimer] = useState(null);
  const [spinningNumber, setSpinningNumber] = useState('0000000000');
  const [number, setNumber] = useState('0000000000');
  const [isAnimating, setIsAnimating] = useState(false);
  const drawContext = useContext(DrawContext);
  const [selectDraws, setSelectDraws] = useState(selectOptions);

  useEffect(() => {
    handleFetchStatistics();
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

  const handleFetchStatistics = async () => {
    setIsLoading(true);

    try {
      const data = await fetchStatistics();
      drawContext.setStatistics(data);
    } catch (error) {
      if (error.response) {
        return toast.error(error.response.data.message);
      }

      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => setNumberOfWinners(e.target.value);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const startAnimation = async () => {
    const msisdnArray = drawContext.data.msisdns;
    const winnersArray = drawContext.data.winners;

    // remove winners from msisdn array
    const eligibleMsisdns = msisdnArray.filter(
      (msisdn) => !winnersArray.includes(msisdn),
    );

    if (eligibleMsisdns.length === 0) return;

    const interval = setInterval(() => {
      const index = Math.floor(Math.random() * eligibleMsisdns.length);
      const randomNumber = eligibleMsisdns[index];
      setSpinningNumber(`0${randomNumber}`);
    }, SPEED);

    setTimer(interval);
  };

  const stopAnimation = () => {
    setTimer(null);
    clearInterval(timer);
  };

  const animateWinners = async (drawResultArray) => {
    if (numberOfWinnersInput <= 4) {
      await sleep(WAIT_TIMER);
    }

    const lastItem = drawResultArray[drawResultArray.length - 1];
    const arrayCopy = [...drawWinners, ...drawResultArray];
    const orderedData = _.sortBy(arrayCopy, 'POSITION');

    setDrawWinners(orderedData);
    setSpinningNumber(`0${lastItem.MSISDN}`);
  };

  const updateStatistics = async () => {
    try {
      const data = await fetchStatistics();
      drawContext.setStatistics(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const disableSelectOption = (option) => {
    const newSelectDraws = selectDraws.map((draw) => {
      if (draw.value === option) {
        return { ...draw, disabled: true };
      }
      return draw;
    });

    setSelectDraws(newSelectDraws);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!numberOfWinnersInput) return;

    setIsAnimating(true);
    // setDrawWinners([]);
    setNumber('0000000000');

    try {
      const randomNumbers = await fetchRandomWinners(numberOfWinnersInput);
      const lastItem = randomNumbers[randomNumbers.length - 1];
      await animateWinners(randomNumbers);
      setNumber(`0${lastItem.MSISDN}`);
      await updateStatistics();
      disableSelectOption(numberOfWinnersInput);
    } catch (error) {
      setSpinningNumber('0000000000');
      // setDrawWinners([]);

      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setNumberOfWinners('');
      setIsLoading(false);
      setIsAnimating(false);
    }
  };

  const handleReset = async (e) => {
    try {
      await resetWinners();
      await updateStatistics();

      setSpinningNumber('0000000000');
      setNumber('0000000000');

      setSelectDraws(selectOptions);
      stopAnimation();
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
            <h4 className="display-1">
              {isAnimating ? spinningNumber : number}
            </h4>
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
                value={numberOfWinnersInput}
              >
                <option></option>
                {selectDraws.map((draw, index) => (
                  <option
                    key={index}
                    value={draw.value}
                    disabled={draw.disabled}
                    className={
                      draw.disabled
                        ? 'disabled text-muted'
                        : 'text-dark foot-weight-500'
                    }
                  >
                    {draw.name}
                  </option>
                ))}
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
