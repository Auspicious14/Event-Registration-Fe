import React, { useEffect, useState } from 'react';

interface IProps {
  countDownDate: string;
}
export const ApCountDown: React.FC<IProps> = ({ countDownDate }) => {
  const [timer, setTimer] = useState<string>('');

  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const countDown = new Date(countDownDate).getTime();
    const timeDifference = countDown - now;

    if (timeDifference < 0) {
      setTimer('EXPIRED');
    } else {
      const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (timeDifference % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (60 * 60 * 1000)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (60 * 1000)) / 1000);

      setTimer(`${days}D ${hours}H ${minutes}M ${seconds}S`);
    }
  };

  useEffect(() => {
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className='text-xl font-bold'>{`${timer}`}</div>;
};
