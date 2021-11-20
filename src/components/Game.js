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
        <div className='container'>
            <div className='row justify-content-center text-center'>
                <h4 className='my-5'>
                    Pick One or More Numbers that Sum Up to the Number of Stars
                </h4>
            </div>
            <div className='row justify-content-center'>
                <div className="col-3">
                    <div className="card p-3 shadow-sm border-4" style={{ height: 240 }}>
                        <div className='row g-0 justify-content-center text-center'>
                            {gameStatus !== 'active' ? (
                                <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} secondsLeft={secondsLeft} />
                            ) : (
                                <StarDisplay stars={stars} />
                            )}
                        </div>
                    </div>
                </div>
                <div className='col-3'>
                    <div className='card p-4 shadow-sm text-center border-4' style={{ height: 240 }}>
                        <div className='row g-0 '>
                            {utils.range(1, 9).map(num => (
                                <div className='col-4'>
                                    <PlayNumber key={num} num={num} status={numStatus(num)} onClick={onNumberClick} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='row text-center my-4'>
                <p className='lead'>
                    Time Remaining:
                    <span style={{
                        color: (secondsLeft >= 5) ? '#007700' : '#dd0000'
                    }}>
                        <i class="bi bi-stopwatch-fill ms-2 me-1"></i>
                        <b>{secondsLeft}</b>
                    </span>
                </p>
            </div>
        </div>
    );
};;