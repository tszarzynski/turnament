import React from 'react';
import styles from './Test.module.css';

type Props = {
  name:string;
}

const Test = ({name}:Props) => {
  return (
    <div className={styles.root}>{name}
    </div>
  );
};

export default Test;