import React, { useContext, useState, useEffect } from 'react';
import { SelectDollContext } from '../context/selectDoll';
import { Doll, DollClasses } from '../data/dolls';
import DollIcon from './dollIcon';
import Button from '@mui/material/Button';
import { DollsContext, initDollData } from '../context/dolls';
import DeleteIcon from '@mui/icons-material/Delete';
import {
   DialogStyled,
   DialogTitleStyled,
   DialogContentStyled,
   DialogActionsStyled,
} from './dollAlgorithmDialog';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import SaveIcon from '@mui/icons-material/Save';

const DataDollDialog: React.FC = () => {
   const { showDoll, setShowDoll } = useContext(SelectDollContext);
   const { setCustom } = useContext(DollsContext);
   const [json, setJson] = useState<string>('');

   useEffect(() => {
      if (showDoll?.[0] !== 'data') {
         return;
      }

      setJson(localStorage.getItem('customDolls') ?? '');
   }, [showDoll]);

   return (
      <DialogStyled
         open={showDoll?.[0] === 'data'}
         onClose={() => {
            setShowDoll(null);
         }}
         maxWidth="sm"
         fullWidth
      >
         <DialogTitleStyled id="alert-dialog-title">데이터</DialogTitleStyled>
         <DialogContentStyled>
            <TextField
               label="JSON"
               multiline
               fullWidth
               disabled
               rows={12}
               value={json}
               onChange={({ target: { value } }) => {
                  setJson(value);
               }}
            />
         </DialogContentStyled>
         <DialogActionsStyled>
            <Button
               variant="contained"
               startIcon={<CloseIcon />}
               color="info"
               onClick={() => {
                  setShowDoll(null);
               }}
            >
               닫기
            </Button>
            <Button
               variant="contained"
               startIcon={<ContentCopyIcon />}
               onClick={() => {
                  navigator.clipboard.writeText(json);
               }}
            >
               복사
            </Button>
            <Button
               variant="contained"
               startIcon={<ContentPasteIcon />}
               onClick={() => {
                  navigator.clipboard.readText().then(value => {
                     setJson(value);
                  });
               }}
            >
               붙여넣기
            </Button>
            <Button
               variant="contained"
               color="success"
               startIcon={<SaveIcon />}
               onClick={() => {
                  setCustom(initDollData(json));
                  setShowDoll(null);
               }}
            >
               적용
            </Button>
         </DialogActionsStyled>
      </DialogStyled>
   );
};

export default React.memo(DataDollDialog);
