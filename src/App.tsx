import React from 'react';
import DollClassList from './components/dollClassList';
import AlgorithmTabView from './components/algorithmTabView';
import DollAlgorithmDialog from './components/dollAlgorithmDialog';
import HelpText from './components/helpText';
import EditAlgorithmDialog from './components/editAlgorithmDialog';
// import SideMenu from './components/sideMenu';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
   palette: {
      primary: {
         main: '#ee7a30',
         contrastText: '#fff',
      },
      secondary: {
         main: '#eb0013',
      },
   },
});

const App: React.FC = () => {
   return (
      <ThemeProvider theme={theme}>
         <DollClassList />
         <HelpText />
         <AlgorithmTabView />
         <DollAlgorithmDialog />
         <EditAlgorithmDialog />
         {/* <SideMenu /> */}
      </ThemeProvider>
   );
};

export default App;
