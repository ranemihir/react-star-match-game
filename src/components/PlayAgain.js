export const PlayAgain = (props) => (
    <div className="game-done">
        <div className="message" style={{ color: props.gameStatus === 'won' ? 'green' : 'red' }}>
            {props.gameStatus === 'won' ? 'You Won! :)' : 'You Lost :('}
        </div>
        <button onClick={() => props.onClick()}>Play Again</button>
    </div>
);