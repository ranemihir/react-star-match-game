import { useState, useEffect } from 'react';
import { render } from 'react-dom';
import './index.scss';

// STAR MATCH - Starting Template

const PlayNumber = (props) => (
  <button className="number" style={{ backgroundColor: colors[props.status] }} onClick={() => props.onClick(props.num, props.status)}>{props.num}</button>
);

const StarDisplay = (props) => (
  <>
    {utils.range(1, props.stars).map(starId => (
      <div key={starId} className="star" />
    ))}
  </>
);

const PlayAgain = (props) => (
  <div className="game-done">
    <div className="message" style={{ color: props.gameStatus === 'won' ? 'green' : 'red' }}>
      {props.gameStatus === 'won' ? 'You Won! :)' : 'You Lost :('}
    </div>
    <button onClick={() => props.onClick()}>Play Again</button>
  </div>
);

const StarMatch = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  });

  const candidatesAreWrong = utils.sum(candidateNums) > stars;

  const gameStatus = availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';

  const resetGame = () => {
    setStars(utils.random(1, 9));
    setAvailableNums(utils.range(1, 9));
    setCandidateNums([]);
    setSecondsLeft(10);
  };

  const onNumberClick = (num, currStatus) => {
    if (currStatus === 'used' || gameStatus !== 'active') {
      return;
    }

    const newCandidateNums = currStatus === 'available' ? candidateNums.concat(num) : candidateNums.filter(n => n !== num);

    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(num => !newCandidateNums.includes(num));

      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };

  const numStatus = (num) => {
    if (!availableNums.includes(num)) {
      return 'used';
    }

    if (candidateNums.includes(num)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }

    return 'available';
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ? (
            <PlayAgain onClick={resetGame} gameStatus={gameStatus} />
          ) : (
            <StarDisplay stars={stars} />
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map(num => (
            <PlayNumber key={num} num={num} status={numStatus(num)} onClick={onNumberClick} />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

// Color Theme 
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};

render(<StarMatch />, document.getElementById('root'));
