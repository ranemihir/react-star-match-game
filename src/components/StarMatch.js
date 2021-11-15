export const StarMatch = (props) => {
    const [gameId, setGameId] = useState(1);

    return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />;
};