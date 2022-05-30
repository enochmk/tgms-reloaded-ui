import { useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';
import DrawCard from './DrawCard';

const TIMEOUT_DURATION = 3500;

const DrawWinners = ({ winners }) => {
  const [width, setWidth] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
  }, []);

  useEffect(() => {
    if (winners > 0) {
      setCelebrate(true);

      setTimeout(() => {
        setCelebrate(false);
      }, TIMEOUT_DURATION);
    }
  }, [winners]);

  return (
    <div ref={ref}>
      {celebrate && <Confetti height={height} width={width} />}
      <div className="row flex-nowrap">
        {winners.firstRound?.length ? (
          <DrawCard title="1st" winners={winners.firstRound} />
        ) : null}
        {winners.secondRound?.length ? (
          <DrawCard title="2nd" winners={winners.secondRound} />
        ) : null}
        {winners.thirdRound?.length ? (
          <DrawCard title="3rd" winners={winners.thirdRound} />
        ) : null}
        {winners.fourthRound?.length ? (
          <DrawCard title="4th-13th" winners={winners.fourthRound} />
        ) : null}
        {winners.fifthRound?.length ? (
          <DrawCard title="14th-33rd" winners={winners.fifthRound} />
        ) : null}
        {winners.sixthRound?.length ? (
          <DrawCard title="34th-93rd" winners={winners.sixthRound} />
        ) : null}
        {winners.seventhRound?.length ? (
          <DrawCard title="94th-363rd" winners={winners.seventhRound} />
        ) : null}
      </div>
    </div>
  );
};

export default DrawWinners;
