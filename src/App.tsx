import React from 'react';
import DollClassList from './components/dollClassList';
import AlgorithmTabView from './components/algorithmTabView';
import DollAlgorithmDialog from './components/dollAlgorithmDialog';
import HelpText from './components/helpText';
import EditAlgorithmDialog from './components/editAlgorithmDialog';
// import SideMenu from './components/sideMenu';

const App: React.FC = () => {
   return (
      <>
         <DollClassList />
         <HelpText />
         <AlgorithmTabView />
         <DollAlgorithmDialog />
         <EditAlgorithmDialog />
         {/* <SideMenu /> */}
      </>
   );
};

export default App;
