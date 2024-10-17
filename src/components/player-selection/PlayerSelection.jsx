import React, { useEffect, useMemo, useState, useCallback } from 'react';
import classNames from 'classnames';
import styles from './PlayerSelection.module.scss';
import UnderLineText from '../underline-text/UnderLineText';
import Icons from '../icons/Icons';
import Axis from 'axis-api';
import PlayerCursor from '../playerCursor/PlayerCursor';

function PlayerSelection({ className, ...props }) {
  const [selectedPlayer1, setSelectedPlayer1] = useState('Missy');
  const [selectedPlayer2, setSelectedPlayer2] = useState('Missy');
  const joystickThreshold = 0.5; // Threshold to change character selection

  const handleJoystickMove = useCallback(
    (setSelectedPlayer) => (event) => {
      const joystickX = event.position.x;

      // Only change character if the joystick is moved significantly left or right
      if (joystickX < -joystickThreshold) {
        setSelectedPlayer('Missy');
      } else if (joystickX > joystickThreshold) {
        setSelectedPlayer('Chris');
      }
    },
    []
  );

  useEffect(() => {
    const joystick1Handler = handleJoystickMove(setSelectedPlayer1);
    const joystick2Handler = handleJoystickMove(setSelectedPlayer2);

    Axis.joystick1.addEventListener('joystick:move', joystick1Handler);
    Axis.joystick2.addEventListener('joystick:move', joystick2Handler);

    return () => {
      Axis.joystick1.removeEventListener('joystick:move', joystick1Handler);
      Axis.joystick2.removeEventListener('joystick:move', joystick2Handler);
    };
  }, [handleJoystickMove]);

  const isSelectionValid = useMemo(() => selectedPlayer1 !== selectedPlayer2, [selectedPlayer1, selectedPlayer2]);

  const renderPlayer = (player, selectedPlayer, opponentPlayer, cursorOutline) => (
    <div className={styles.player}>
      <div className={styles.playerCursor}>
        {selectedPlayer === player && <PlayerCursor player="I" outline={cursorOutline} />}
        {opponentPlayer === player && <PlayerCursor player="II" outline={cursorOutline} />}
      </div>
      <div className={styles.playerImg}>
        <img src={`/images/${player.toLowerCase()}.png`} alt={player} />
      </div>
      <div className={styles.playerName}>{player}</div>
    </div>
  );

  return (
    <div className={classNames(styles.wrapper, className)} {...props}>
      <h1 className={styles.title}>Sélectionnez vos personnages</h1>
      <div className={styles.playersWrapper}>
        {renderPlayer('Missy', selectedPlayer1, selectedPlayer2, 'p1_outline')}
        {renderPlayer('Chris', selectedPlayer1, selectedPlayer2, 'p1_outline')}
      </div>
      <UnderLineText
        className={classNames(styles.textContainer, { [styles.valid]: isSelectionValid })}
        text1="Appuyez sur"
        text2="pour continuer"
        icon={<Icons id="axis_a" fill={isSelectionValid ? '#ffffff' : '#ae9e9c'} />}
        underlineColor={isSelectionValid ? '#ffffff' : '#ae9e9c'}
      />
    </div>
  );
}

export default PlayerSelection;
