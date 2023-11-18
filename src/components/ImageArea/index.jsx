import React, { useState } from 'react';
import "./ImageArea.css";
import DeleteIcon from '@mui/icons-material/Delete';
import { MdCancel } from "react-icons/md";
import DeleteModal from '../DeleteModal';

function ImageArea({ generatedImages, onDeleteImage }) {

  const [openDeleteModal, setOpenDeleteModal] = useState({
    isOpen: false,
    index: -1,
  });
  const handleOpenDeleteModal = (index) => setOpenDeleteModal({
    isOpen: true,
    index: index,
  });
  const handleCloseDeleteModal = (index) => setOpenDeleteModal({
    isOpen: false,
    index: -1,
  });

  const deleteImage = () => {
    if(!openDeleteModal.isOpen) return ;
    onDeleteImage(openDeleteModal.index);
    handleCloseDeleteModal();
  }

  return (
    <div className="image-board">
      {generatedImages.map((image, index) => (
        <div key={index} className="image-container">
            <img src={image} alt={`Generated Image ${index + 1}`} className="generated-image" />
            <MdCancel style={{color: 'red'}} onClick={() => handleOpenDeleteModal(index)} className="delete-button"/>
        </div>
      ))}
      <DeleteModal open={openDeleteModal.isOpen} handleClose={handleCloseDeleteModal} deleteImage={deleteImage} />
    </div>
  );
}

export default ImageArea;