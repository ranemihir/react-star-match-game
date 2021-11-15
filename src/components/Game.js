import { useState, useEffect } from 'react';
import { utils } from './../utils';
import { PlayAgain } from './PlayAgain';
import { StarDisplay } from './StarDisplay';
import { PlayNumber } from './PlayNumber';


export const Game = (props) => {
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

    // const resetGame = () => {
    //   setStars(utils.random(1, 9));
    //   setAvailableNums(utils.range(1, 9));
    //   setCandidateNums([]);
    //   setSecondsLeft(10);
    // };

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
                        <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
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