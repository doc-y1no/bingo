'use client';

import { motion } from 'framer-motion';
import styles from '../styles/bingo.module.css';

interface DrawnNumbersProps {
  numbers: number[];
}

const DrawnNumbers = ({ numbers }: DrawnNumbersProps) => {
  return (
    <div className={styles.drawnNumbers}>
      <h3>既出の番号</h3>
      <div className={styles.numberGrid}>
        {numbers.map((num, index) => (
          <motion.div
            key={num}
            className={styles.number}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 * (index % 5) }}
          >
            {num}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DrawnNumbers;
