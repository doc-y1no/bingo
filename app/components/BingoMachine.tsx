'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BingoBall from './BingoBall';
import DrawnNumbers from './DrawnNumbers';
import styles from '../styles/bingo.module.css';

const BingoMachine = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);

  // 初期化時にローカルストレージから状態を復元
  useEffect(() => {
    const savedDrawnNumbers = localStorage.getItem('drawnNumbers');
    const savedCurrentNumber = localStorage.getItem('currentNumber');

    if (savedDrawnNumbers) {
      const parsedDrawnNumbers = JSON.parse(savedDrawnNumbers);
      setDrawnNumbers(parsedDrawnNumbers);

      // 残りの番号を計算（1-100）
      const remainingNumbers = Array.from({ length: 100 }, (_, i) => i + 1)
        .filter(num => !parsedDrawnNumbers.includes(num));
      setNumbers(remainingNumbers);
    } else {
      // 初期状態の設定（1-100）
      setNumbers(Array.from({ length: 100 }, (_, i) => i + 1));
    }

    if (savedCurrentNumber) {
      setCurrentNumber(Number(savedCurrentNumber));
    }
  }, []);

  // 状態が変更されたときにローカルストレージを更新
  useEffect(() => {
    localStorage.setItem('drawnNumbers', JSON.stringify(drawnNumbers));
    if (currentNumber) {
      localStorage.setItem('currentNumber', currentNumber.toString());
    }
  }, [drawnNumbers, currentNumber]);

  const drawNumber = () => {
    if (numbers.length === 0) return;

    setIsSpinning(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      const drawn = numbers[randomIndex];

      setCurrentNumber(drawn);
      setDrawnNumbers(prev => [...prev, drawn]);
      setNumbers(prev => prev.filter(n => n !== drawn));
      setIsSpinning(false);
    }, 2000);
  };

  // リセット機能
  const resetGame = () => {
    if (isSpinning) return;

    // 1-100の番号で初期化
    setNumbers(Array.from({ length: 100 }, (_, i) => i + 1));
    setCurrentNumber(null);
    setDrawnNumbers([]);
    localStorage.removeItem('drawnNumbers');
    localStorage.removeItem('currentNumber');
  };

  return (
    <div className={styles.bingoContainer}>
      <motion.div
        className={styles.bingoMachine}
        animate={{
          rotate: isSpinning ? 360 : 0,
        }}
        transition={{
          duration: 2,
          repeat: isSpinning ? Infinity : 0,
          ease: "linear"
        }}
      >
        <div className={styles.machineBody}>
          <div className={styles.machineWindow}>
            {currentNumber && !isSpinning && (
              <BingoBall number={currentNumber} />
            )}
          </div>
        </div>
      </motion.div>

      <div className={styles.buttonContainer}>
        <button
          className={styles.drawButton}
          onClick={drawNumber}
          disabled={isSpinning || numbers.length === 0}
        >
          {isSpinning ? '抽選中...' : '番号を引く'}
        </button>

        <button
          className={`${styles.drawButton} ${styles.resetButton}`}
          onClick={resetGame}
          disabled={isSpinning}
        >
          リセット
        </button>
      </div>

      <DrawnNumbers numbers={drawnNumbers} />
    </div>
  );
};

export default BingoMachine;
