import React, { createContext, useEffect, useState } from 'react';

const DayContext = createContext({
   day: 0,
});

interface Props {
   children: React.ReactNode;
}

const getNowDay = () => {
   const now = new Date();
   const utc4 = new Date(
      now.getTime() + now.getTimezoneOffset() * 60000 + 14400000
   );
   return utc4.getDay();
};

const DayProvider: React.FC<Props> = ({ children }) => {
   const [day, setDay] = useState<number>(getNowDay());

   useEffect(() => {
      const timer = setInterval(() => {
         setDay(getNowDay());
      }, 60000);

      return () => clearInterval(timer);
   }, []);

   return (
      <DayContext.Provider
         value={{
            day,
         }}
      >
         {children}
      </DayContext.Provider>
   );
};

export { DayContext, DayProvider };
