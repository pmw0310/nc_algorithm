import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';

const SelectStyled = styled(Select)(() => ({
   '&.MuiInputBase-root': {
      '& fieldset': {
         borderColor: '#fff',
      },
      '&:hover fieldset': {
         borderColor: '#aaa',
      },
   },
   '.MuiSelect-select': {
      display: 'flex',
      alignItems: 'center',
      color: '#fff',
      img: {
         objectFit: 'contain',
         marginRight: 8,
      },
   },
   '.MuiSelect-icon': {
      color: '#fff',
   },
}));

const MenuItemStyled = styled(MenuItem)(() => ({
   display: 'flex',
   alignItems: 'center',
   marginLeft: 12,
   img: {
      filter:
         'invert(97%) sepia(4%) saturate(200%) hue-rotate(12deg) brightness(88%) contrast(84%)',
      objectFit: 'contain',
      marginRight: 6,
   },
   '&.Mui-selected': {
      backgroundColor: 'rgba(238, 122, 48, 0.45)',
      '&:hover': {
         backgroundColor: 'rgba(238, 122, 48, 0.9)',
      },
   },
   '&:hover': {
      backgroundColor: 'rgba(238, 122, 48, 0.55)',
   },
}));

const ListSubheaderStyled = styled(ListSubheader)(() => ({
   display: 'flex',
   alignItems: 'center',
   img: {
      filter:
         'invert(97%) sepia(4%) saturate(200%) hue-rotate(12deg) brightness(88%) contrast(84%)',
      objectFit: 'contain',
      marginRight: 6,
   },
}));

const InputLabelStyled = styled(InputLabel)(() => ({
   color: '#fff',
   // '&.Mui-focused': {
   //    color: '#ed752f',
   // },
}));

export {
   SelectStyled as Select,
   MenuItemStyled as MenuItem,
   ListSubheaderStyled as ListSubheader,
   InputLabelStyled as InputLabel,
};
