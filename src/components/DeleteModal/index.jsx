import React from "react";
import Modal from '@mui/material/Modal';
import { Box, Button } from "@mui/material";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function DeleteModal({open, handleClose, deleteImage}) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <ErrorOutlineOutlinedIcon style={{color : 'red'}} />
                Are you sure you want to delete this Comic strip?
                <br/><br/>
                <Button onClick={deleteImage} variant="contained" color="error" style={{marginRight: '1vmax', fontSize: '1vmax'}}>Yes</Button>
                <Button onClick={handleClose} variant="contained" color="success" style={{fontSize: '1vmax'}}>No</Button>
            </Box>
        </Modal>
    )
}

export default DeleteModal;