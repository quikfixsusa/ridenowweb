'use client';

import * as faceapi from 'face-api.js';
import './face.css';
import React, { useRef, useEffect, useState } from 'react';

import CameraIcon from '../components/svg/CameraIcon';

export default function FacePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    startVideo();
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      ?.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error('error:', err));
  };

  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models'); // Load SsdMobilenetv1 model
  };

  const handleCapture = async () => {
    if (videoRef.current && canvasRef.current) {
      const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
      canvasRef.current.width = displaySize.width;
      canvasRef.current.height = displaySize.height;

      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, displaySize.width, displaySize.height);
        const dataUrl = canvasRef.current.toDataURL('image/jpeg');
        setImage(dataUrl);

        // Detect faces in the captured image
        const detections = await faceapi
          .detectAllFaces(canvasRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();
        console.log('detections', detections);
      }
    }
  };

  const compareFaces = async () => {
    if (image) {
      const img1 = await faceapi.fetchImage(image);
      const img2 = await faceapi.fetchImage('/images/yo.jpg');

      const detections1 = await faceapi.detectSingleFace(img1).withFaceLandmarks().withFaceDescriptor();
      const detections2 = await faceapi.detectSingleFace(img2).withFaceLandmarks().withFaceDescriptor();

      if (detections1 && detections2) {
        const distance = faceapi.euclideanDistance(detections1.descriptor, detections2.descriptor);
        if (distance < 0.6) {
          alert('Faces match!');
        } else {
          alert('Faces do not match.');
        }
      } else {
        alert('Could not detect faces in one or both images.');
      }
    }
  };

  useEffect(() => {
    if (image) {
      compareFaces();
    }
  }, [image]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black">
      {!image && <video className="h-screen w-full" ref={videoRef} autoPlay muted />}
      {image && (
        <div className="flex aspect-square h-auto w-full items-center justify-center sm:h-full sm:w-auto">
          <img src={image} alt="user-image" className="h-auto w-full object-cover sm:h-full sm:w-auto" />
        </div>
      )}
      <button
        className="absolute bottom-6 left-1/2 -translate-x-1/2 transform rounded-full border-2 border-gray-300 bg-white p-6"
        onClick={handleCapture}
      >
        <CameraIcon size={24} color="black" />
      </button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
