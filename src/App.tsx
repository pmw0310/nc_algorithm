import React from 'react';
import DollClassList from './components/dollClassList';
import AlgorithmTabView from './components/algorithmTabView';
import DollAlgorithmDialog from './components/dollAlgorithmDialog';
import HelpText from './components/helpText';
import EditAlgorithmDialog from './components/editAlgorithmDialog';
import AddDollDialog from './components/addDollDialog';
import RemoveDollDialog from './components/removeDollDialog';
import DataDollDialog from './components/dataDollDialog';
import SideMenu from './components/sideMenu';

const App: React.FC = () => {
   return (
      <>
         <DollClassList />
         <HelpText />
         <AlgorithmTabView />
         <DollAlgorithmDialog />
         <EditAlgorithmDialog />
         <AddDollDialog />
         <RemoveDollDialog />
         <DataDollDialog />
         <SideMenu />
      </>
   );
};

export default App;
