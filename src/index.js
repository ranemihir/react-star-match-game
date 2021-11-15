import { useState, useEffect } from 'react';
import { render } from 'react-dom';
import './index.scss';

// utils
import { utils } from './utils';
const { sum, range, random, randomSumIn } = utils;

// components
import { Game } from './components/Game';
import { PlayAgain } from './components/PlayAgain';
import { PlayNumber } from './components/PlayNumber';
import { StarDisplay } from './components/StarDisplay';
import { StarMatch } from './components/StarMatch';


render(<StarMatch />, document.getElementById('root'));
