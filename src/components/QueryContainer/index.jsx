import React from 'react';
import { TextField, Button } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import "./QueryContainer.css";

function DrawerComponent({ handleInputChange, handleSubmit, inputText }) {
  return (
    <div className='add-drawer' style={{fontSize: '1vmax'}}>
      <TextField
          label="Enter Prompt"
          variant="outlined"
          fullWidth
          value={inputText}
          onChange={handleInputChange}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{marginTop: '1vmax', fontSize: '1vmax'}}>
          Generate&nbsp; <AutoAwesomeIcon />
      </Button>
    </div>
  );
}

export default DrawerComponent;