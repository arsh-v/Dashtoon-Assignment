import React from "react";
import Modal from '@mui/material/Modal';
import { Box, Button } from "@mui/material";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function ClearModal({open, handleClose, clearPanel}) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{fontSize: '1vmax'}}
        >
            <Box sx={style}>
                <ErrorOutlineOutlinedIcon style={{color : 'red'}} />
                Are you sure you want to clear Comic Panel?
                <br/>
                <Button variant="contained" color="error" onClick={clearPanel} style={{marginRight: '1vmax', fontSize: '1vmax'}}>Yes</Button>
                <Button variant="contained" color="success" onClick={handleClose} style={{fontSize: '1vmax'}}>No</Button>
            </Box>
        </Modal>
    )
}

export default ClearModal;