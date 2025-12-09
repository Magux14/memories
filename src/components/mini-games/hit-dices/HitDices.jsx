import React, { useEffect, useState } from 'react';
import './hit-dices.scss';

export const HitDices = ({ callbackClose, callbackSuccess }) => {

    const [tries, setTries] = useState(0);
    const [dice1, setDice1] = useState(1);
    const [dice2, setDice2] = useState(4);
    const [dice3, setDice3] = useState(2);

    const rollDices = () => {
        if (tries === 0) {
            setDice1(prev => diceRules(prev));
            setDice2(prev => diceRules(prev));
            setDice3(prev => diceRules(prev));
        } else if (tries === 1) {
            setDice2(prev => diceRules(prev));
            setDice3(prev => diceRules(prev));
        } else if (tries === 2) {
            setDice3(prev => diceRules(prev));
        }
    }

    const winCondition = () => tries == 3 && (dice1 == dice2 && dice2 == dice3)

    const hitDice = () => {

        if (winCondition()) {
            callbackSuccess();
            return;
        } else if (tries == 3) {
            callbackClose();
            return;
        }
        setTries(prev => prev + 1);
    }

    const diceRules = (number) => {
        if (number == 4) {
            return 1;
        }

        return number + 1;
    }
    useEffect(() => {
        const interval = setInterval(() => {
            rollDices();
        }, 120);

        return () => clearInterval(interval);
    }, [tries]);

    return (
        <div className="hit-dices__container">

            <div className="hit-dices__dices-container">
                <div className="hit-dices__dice">
                    <img src={`../img/games/dices/${dice1}.webp`} />
                </div>

                <div className="hit-dices__dice">
                    <img src={`../img/games/dices/${dice2}.webp`} />
                </div>

                <div className="hit-dices__dice">
                    <img src={`../img/games/dices/${dice3}.webp`} />
                </div>
            </div>
            <div className="hit-dices__dices-container">
                <button className="hit-dices__button" onClick={() => hitDice()}>{winCondition() ? 'Awesome!' : tries == 3 ? 'Nice try' : 'Hit'}</button>
            </div>

        </div>
    )
}
