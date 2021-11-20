export const PlayAgain = (props) => (
    <>
        <h2 className="mt-4" style={{ color: props.gameStatus === 'won' ? '#007700' : '#ee0000' }}>
            {props.gameStatus === 'won' ? 'You Won!' : 'You Lost'}
        </h2>
        {
            (props.secondsLeft > 0) &&
            <p className="lead">Score:
                <strong className="ms-1">{props.secondsLeft * 10}</strong>
            </p>
        }
        <button className="btn btn-dark col-6 shadow-sm mt-4 rounded-pill" onClick={() => props.onClick()}>Play Again</button>
    </>
);
