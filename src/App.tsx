import React from 'react';
import DollClassList from './components/dollClassList';
import AlgorithmTabView from './components/algorithmTabView';
import DollAlgorithmDialog from './components/dollAlgorithmDialog';
import HelpText from './components/helpText';

const App: React.FC = () => {
   return (
      <>
         <DollClassList />
         <HelpText />
         <AlgorithmTabView />
         <DollAlgorithmDialog />
      </>
   );
};

export default App;
