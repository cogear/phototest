'use client';
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function Home() {
    // Webcam reference to access webcam methods
    const webcamRef = useRef(null);

    // State to store the captured photo
    const [imageSrc, setImageSrc] = useState(null);

    // Webcam constraints
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "enviroment",
    };

    // Capture photo function
    const capture = () => {
        if (webcamRef.current) {
            const image = webcamRef.current.getScreenshot();
            setImageSrc(image); // Save the captured photo
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            {/* Webcam Container */}
            <div className="relative w-full max-w-screen-md aspect-video bg-gray-800 rounded-lg overflow-hidden">
                {/* Webcam component */}
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Capture Button */}
            <button
                onClick={capture}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
                Capture Photo
            </button>

            {/* Display Captured Photo */}
            {imageSrc && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Captured Photo:</h2>
                    <img
                        src={imageSrc}
                        alt="Captured"
                        className="mt-2 rounded-md shadow-lg max-w-full"
                    />
                </div>
            )}
        </div>
    );
}
