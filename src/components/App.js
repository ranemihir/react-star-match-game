import { useState } from 'react';
import { Game } from './Game';

export const App = (props) => {
    const [gameId, setGameId] = useState(1);

    const onStartNewGame = () => setGameId(gameId + 1);

    return (
        <Game key={gameId} startNewGame={onStartNewGame} />
    );
};