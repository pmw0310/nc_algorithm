import React from 'react';
import DollClassList from './components/dollClassList';
import AlgorithmTabView from './components/algorithmTabView';
import DollAlgorithmDialog from './components/dollAlgorithmDialog';
import TouchAppIcon from '@mui/icons-material/TouchApp';

const App: React.FC = () => {
   return (
      <>
         <DollClassList />
         <div
            style={{
               display: 'flex',
               margin: 8,
               justifyContent: 'center',
               alignItems: 'center',
               fontWeight: 'bold',
            }}
         >
            <TouchAppIcon
               style={{
                  marginRight: 8,
               }}
            />
            인형 아이콘을 길게 눌러서 개별 알고리즘 확인
         </div>
         <AlgorithmTabView />
         <DollAlgorithmDialog />
      </>
   );
};

export default App;
