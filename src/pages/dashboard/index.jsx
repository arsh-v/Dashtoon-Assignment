import React, { useState } from "react";
import "./dashboard.css";
// import logo from "../../assets/logo.png";
import Button from "@mui/material/Button";
import { MdCatchingPokemon } from "react-icons/md";
import { SiFoodpanda } from "react-icons/si";
import { Drawer, Tooltip } from "@mui/material";
import DrawerComponent from "../../components/QueryContainer";
import ImageArea from "../../components/ImageArea";
import jsPDF from "jspdf";
import ClearModal from "../../components/ClearModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function query(data) {
  const response = await fetch(
    "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
    {
      headers: {
        Accept: "image/png",
        Authorization:
          "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}

function Dashboard({ loading, setLoading }) {
  const notify = (e) => {
    toast.error(e, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifySuccess = (e) => {
    toast.success(e, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [inputText, setInputText] = useState("");

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    toggleDrawer();
    try {
      const result = await query({ inputs: inputText });

      // Set the generated image in the state
      setGeneratedImages((prevImages) =>
        [...prevImages, URL.createObjectURL(result)].slice(-10)
      );

      setLoading(false);

      notifySuccess("Image generated successfully!!");
    } catch (error) {
      //console.error("Error fetching image:", error);
      notify("Failed to generate an Image", error);
      setLoading(false);
    }

    // Optionally, you can clear the input field after submitting
    setInputText("");

    // Close the drawer
    toggleDrawer();
  };

  const handleDeleteImage = (index) => {
    setGeneratedImages((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
  };

  const isAddButtonDisabled = generatedImages.length >= 10;

  const isClearButtonDisabled = generatedImages.length === 0;

  const generatePdf = () => {
    const pdf = new jsPDF("p", "mm", [326, 131]);
    let xOffset = 1;
    let yOffset = 1;

    for (let i = 0; i < generatedImages.length; i++) {
      if (i % 2 === 0 && i !== 0) {
        yOffset += 65; // Adjust as needed
        xOffset = 1;
      } else if (i !== 0) {
        xOffset = 66;
      }

      const img = new Image();
      img.src = generatedImages[i];
      //console.log(generatedImages[i]);

      pdf.addImage(img, "PNG", xOffset, yOffset, 64, 64);
      //xOffset += 100; // Adjust as needed
    }

    pdf.save("comic-panel.pdf");
  };

  const [openClearModal, setOpenClearModal] = useState(false);
  const handleOpenClearModal = () => setOpenClearModal(true);
  const handleCloseClearModal = () => setOpenClearModal(false);

  const clearPanel = () => {
    setGeneratedImages([]);
    handleCloseClearModal();
  };

  return (
    <div>
      <ToastContainer />
      <nav className="navbar">
        {/* <img src={logo} alt="Logo" className="logo" /> */}
        <div className="name1">
          <div className="name">
            <span>
              {<MdCatchingPokemon />}Dashtoon Comic Project {<SiFoodpanda />}
            </span>
          </div>
          <div className="menuButton">
            <button
              onClick={toggleDrawer}
              className="button button1"
              disabled={isAddButtonDisabled}
            >
              Add Comic Card
            </button>
            <button
              onClick={handleOpenClearModal}
              className="button button2"
              disabled={isClearButtonDisabled}
            >
              Discard Panel
            </button>
            <button
              onClick={generatePdf}
              className="button button3"
              disabled={!isAddButtonDisabled}
            >
              Share Comic Card
            </button>
            <ClearModal
              open={openClearModal}
              handleClose={handleCloseClearModal}
              clearPanel={clearPanel}
            />
          </div>
        </div>
      </nav>
      <div className="mainBody">
        {/* <div className="options">
                <button className="button" onClick={toggleDrawer} disabled={isAddButtonDisabled}>Add Comic Strip</button>
                <button className="button" onClick={handleOpenClearModal} disabled={isClearButtonDisabled} >Clear Panel</button>
                <button className="button" onClick={generatePdf} disabled={!isAddButtonDisabled}>Share Comic Strip</button>
                <Tooltip
                    title={isAddButtonDisabled ? "Maximum 10 images allowed" : ""}
                >
                    <span>
                    <Button
                        // variant="contained"
                        onClick={toggleDrawer}
                        disabled={isAddButtonDisabled}
                        className = "button"
                    >
                        Add Comic Strip
                    </Button>
                    </span>
                </Tooltip>
                <Button
                    // variant="outlined"
                    color="error"
                    onClick={handleOpenClearModal}
                    disabled={isClearButtonDisabled}
                    // style={{ fontSize: "1vmax" }}
                    className = "button"
                >
                    Clear Panel
                </Button>
                <Tooltip title={!isAddButtonDisabled ? "10 images required" : ""}>
                    <span>
                    <Button
                        // variant="contained"
                        onClick={generatePdf}
                        disabled={!isAddButtonDisabled}
                        // style={{ fontSize: "1vmax" }}
                        className = "button"
                    >
                        Share Comic Strip
                    </Button>
                    </span>
                </Tooltip>
                <ClearModal
                    open={openClearModal}
                    handleClose={handleCloseClearModal}
                    clearPanel={clearPanel}
                />
            </div> */}
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
          <DrawerComponent
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            inputText={inputText}
            loading={loading}
          />
        </Drawer>
        <ImageArea
          generatedImages={generatedImages}
          onDeleteImage={handleDeleteImage}
        />
      </div>
    </div>
  );
}

export default Dashboard;
