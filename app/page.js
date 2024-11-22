'use client';
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function Home() {
    const webcamRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "environment",
    };

    const capture = () => {
        if (webcamRef.current) {
            const image = webcamRef.current.getScreenshot();
            setImageSrc(image);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            {/* Webcam */}
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="rounded-lg border border-gray-300 shadow-md"
            />

            {/* Capture Button */}
            <button
                onClick={capture}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
                Capture Photo
            </button>

            {/* Display Captured Photo */}
            {imageSrc && (
                <div className="mt-4 flex flex-col items-center">
                    <h2 className="text-lg font-semibold">Captured Photo:</h2>
                    <img
                        src={imageSrc}
                        alt="Captured"
                        className="mt-2 rounded-md shadow-lg border border-gray-200"
                        style={{
                            maxWidth: "90%", // Limit image size to fit within container
                            height: "auto",  // Maintain aspect ratio
                        }}
                    />
                </div>
            )}
        </div>
    );
}
