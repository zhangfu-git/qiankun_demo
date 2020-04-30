import React, { useEffect, useState } from 'react';
import styles from './index.less';
import dayjs from 'dayjs';

export default function DateTip(props) {
  let currSecond = dayjs().second();
  currSecond = currSecond < 10 ? `0${currSecond}`: currSecond;
  const defaultDate = dayjs().format('llll') + `:${currSecond}`;
  let interval = 0;
  const [dateLLL, setDateLLL] = useState(defaultDate);
  useEffect(() => {
    interval = setInterval(() => {
      let currSecond = dayjs().second();
      currSecond = currSecond < 10 ? `0${currSecond}` : currSecond;
      let curr = dayjs().format('llll') + `:${currSecond}`;
      setDateLLL(curr);
    }, 1000);
    return () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }
  }, []);
  return (
    <div
      className={styles.dateTip}
    >
      今日, {dateLLL}
    </div>
  )
}