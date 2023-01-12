import { isNil } from 'lodash';
import React, { createContext, useEffect, useState, useCallback } from 'react';

interface SelectDollContextProps {
   selectDoll: Record<string, boolean>;
   setSelect: (key: string, select: boolean) => void;
}

const SelectDollContext = createContext<SelectDollContextProps>({
   selectDoll: {},
   setSelect: () => {},
});

interface Props {
   children: React.ReactNode;
}

const SelectDollProvider: React.FC<Props> = ({ children }) => {
   const [selectDoll, setSelectDoll] = useState<Record<string, boolean>>(
      (() => {
         const data = localStorage.getItem('dollCheck');
         if (isNil(data)) {
            return {};
         }
         return JSON.parse(data);
      })()
   );

   useEffect(() => {
      localStorage.setItem('dollCheck', JSON.stringify(selectDoll));
   }, [selectDoll]);

   const setSelect = useCallback(
      (key: string, select: boolean) => {
         setSelectDoll(data => ({
            ...data,
            [key]: select,
         }));
      },
      [setSelectDoll]
   );

   return (
      <SelectDollContext.Provider
         value={{
            selectDoll,
            setSelect,
         }}
      >
         {children}
      </SelectDollContext.Provider>
   );
};

export { SelectDollContext, SelectDollProvider };
