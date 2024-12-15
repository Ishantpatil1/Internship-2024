import React, { useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import "./App.css";

const App = () => {
    const canvasRef = useRef(null);
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSaveMask = () => {
        const canvas = canvasRef.current.canvasContainer.children[1];
        const maskImage = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = maskImage;
        link.download = "mask.png";
        link.click();
    };

    return (
        <div className="App">
            <h1>Image Inpainting Widget</h1>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {image && (
                <div>
                    <img src={image} alt="Uploaded" className="uploaded-image" />
                    <CanvasDraw ref={canvasRef} brushColor="#FFFFFF" lazyRadius={0} />
                    <button onClick={handleSaveMask}>Save Mask</button>
                </div>
            )}
        </div>
    );
};

export default App;
