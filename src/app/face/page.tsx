'use client';

import * as faceapi from 'face-api.js';
import './face.css';
import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';

import CameraIcon from '../components/svg/CameraIcon';
import CloseIcon from '../components/svg/CloseIcon';
import SwitchCameraIcon from '../components/svg/SwitchCameraIcon';

export default function FacePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const webcamRef: React.LegacyRef<Webcam> = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [devices, setDevices] = useState<MediaDeviceInfo[] | null>([]);
  const [currentDeviceId, setCurrentDeviceId] = useState<ConstrainDOMString | undefined>(undefined);
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

  /* const handleCapture = async () => {
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
  }; */

  const handleCap = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
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

  const handleSwitchCamera = () => {
    if (devices === null) return;
    if (devices.length > 1) {
      const currentIndex = devices.findIndex((device) => device.deviceId === currentDeviceId);
      const nextIndex = (currentIndex + 1) % devices.length;
      setCurrentDeviceId(devices[nextIndex].deviceId); // Cambia al siguiente dispositivo
    }
  };

  useEffect(() => {
    if (image) {
      compareFaces();
    }
  }, [image]);

  useEffect(() => {
    // Obtén los dispositivos disponibles
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === 'videoinput');
        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setCurrentDeviceId(videoDevices[0].deviceId); // Por defecto, selecciona la primera cámara
        }
      } catch (error) {
        console.error('Error al enumerar dispositivos:', error);
      }
    };

    getDevices();
  }, []);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black">
      {!image && (
        <Webcam
          className={`h-full w-full ${image ? 'hidden' : ''}`}
          ref={webcamRef}
          mirrored
          videoConstraints={{
            deviceId: currentDeviceId,
          }}
        />
      )}
      {!image && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 transform items-center gap-4">
          <button className="rounded-full border-2 border-gray-300 bg-white p-6" onClick={handleCap}>
            <CameraIcon size={24} color="black" />
          </button>
          {devices && devices?.length > 1 && (
            <button className="rounded-full border-2 border-gray-300 bg-white p-4" onClick={handleSwitchCamera}>
              <SwitchCameraIcon size={24} color="black" />
            </button>
          )}
        </div>
      )}
      {image && (
        <button className="absolute left-4 top-4" onClick={() => setImage(null)}>
          <CloseIcon size={24} color="white" />
        </button>
      )}
      {image && <img src={image} alt="user-image" className="h-auto w-full sm:h-full sm:w-auto" />}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
