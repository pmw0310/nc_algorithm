import React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import WeekAlgorithmView from './weekAlgorithmView';
import DollAlgorithmView from './dollAlgorithmView';

interface TabPanelProps {
   children?: React.ReactNode;
   index: number;
   value: number;
}

function TabPanel(props: TabPanelProps) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && children}
      </div>
   );
}

function a11yProps(index: number) {
   return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
   };
}

const StyledTabs = styled(Tabs)(() => ({
   backgroundColor: '#1d1d1e',
   '.MuiButtonBase-root': {
      color: '#888888',
      img: {
         filter:
            'invert(45%) sepia(3%) saturate(0%) hue-rotate(61deg) brightness(99%) contrast(92%)',
      },
   },
   '.Mui-selected': {
      backgroundColor: '#4d4e4e !important',
      color: '#FC8A00 !important',
      fontWeight: 'bold',
      img: {
         filter:
            'invert(48%) sepia(96%) saturate(1271%) hue-rotate(5deg) brightness(103%) contrast(104%)',
      },
   },
   '.MuiTabs-indicator': {
      display: 'none',
   },
}));

const AlgorithmTabView: React.FC = () => {
   const [tabIndex, setTabIndex] = React.useState(0);

   const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
      setTabIndex(newIndex);
   };

   return (
      <Box
         sx={{
            width: '100%',
            height: 'calc(100% + 28px)',
            border: '#1d1d1e solid 2px',
            backgroundColor: '#4d4e4e',
         }}
      >
         <StyledTabs
            value={tabIndex}
            onChange={handleChange}
            aria-label="basic tabs example"
         >
            <Tab
               label="요일별 알고리즘"
               // icon={
               //    <Image
               //       src="https://i.ibb.co/GPJJTRt/calendar-icon.png"
               //       webp="https://i.ibb.co/XbZvdK1/calendar-icon.webp"
               //       width={20}
               //       height={20}
               //    />
               // }
               iconPosition="start"
               {...a11yProps(0)}
            />
            <Tab
               label="개별 알고리즘"
               // icon={
               //    <Image
               //       src="https://i.ibb.co/LdHxg9M/people-icon.png"
               //       webp="https://i.ibb.co/3pzq46K/people-icon.webp"
               //       width={20}
               //       height={20}
               //    />
               // }
               iconPosition="start"
               {...a11yProps(1)}
            />
         </StyledTabs>
         <TabPanel value={tabIndex} index={0}>
            <WeekAlgorithmView />
         </TabPanel>
         <TabPanel value={tabIndex} index={1}>
            <DollAlgorithmView />
         </TabPanel>
      </Box>
   );
};

export default React.memo(AlgorithmTabView);
