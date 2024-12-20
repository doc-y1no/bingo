'use client';

import { motion } from 'framer-motion';
import styles from '../styles/bingo.module.css';

interface BingoBallProps {
  number: number;
}

const BingoBall = ({ number }: BingoBallProps) => {
  return (
    <motion.div
      className={styles.bingoBall}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", bounce: 0.4 }}
    >
      {number}
    </motion.div>
  );
};

export default BingoBall;
