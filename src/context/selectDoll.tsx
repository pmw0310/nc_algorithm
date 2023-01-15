import React, {
   createContext,
   useEffect,
   useState,
   useCallback,
   useMemo,
} from 'react';
import { isNil, toPairs } from 'lodash';

interface SelectDollContextProps {
   selectDoll: Record<string, boolean>;
   selectDolls: Array<string>;
   setSelect: (key: string, select: boolean) => void;
   showDoll: string | null;
   setShowDoll: (doll: string | null) => void;
}

const SelectDollContext = createContext<SelectDollContextProps>({
   selectDoll: {},
   selectDolls: [],
   setSelect: () => {},
   showDoll: null,
   setShowDoll: () => {},
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
   const [showDoll, setShowDoll] = useState<string | null>(null);

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

   const selectDolls = useMemo(
      () =>
         toPairs(selectDoll)
            .filter(([, value]) => value)
            .map(([key]) => key),
      [selectDoll]
   );

   return (
      <SelectDollContext.Provider
         value={{
            selectDoll,
            selectDolls,
            setSelect,
            showDoll,
            setShowDoll,
         }}
      >
         {children}
      </SelectDollContext.Provider>
   );
};

export { SelectDollContext, SelectDollProvider };
