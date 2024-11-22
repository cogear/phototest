'use client'
import Image from "next/image";
import React, {useRef, useEffect, useState} from "react";

export default function Home() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 1920, height:1080
      }
    }).then(stream => {
      let video = videoRef.current;
      video.srcObject = stream;
      video.play();
    })
  }

  const takePhoto = () => {
    const width = 414;
    const height = width/ (16/9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);

  }
useEffect(() => {
  getVideo();
},[videoRef])
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <h1>Photo Test</h1>
      <div className="App">
      <div className="camera">
        <video ref={videoRef}></video>
        <button
            onClick={takePhoto}
            className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-700 transition"
        >
          📸 Snap
        </button>
      </div>
        <div className="result">
          <canvas ref={photoRef}></canvas>
          <button
              onClick={takePhoto}
              className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-700 transition"
          >Close
          </button>
        </div>
      </div>
    </div>
  );
}
