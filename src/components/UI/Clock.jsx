import { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <div>
        <h1 className='text-center font-medium text-lg'>
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </h1>
    </div>
  );
}

export default Clock;