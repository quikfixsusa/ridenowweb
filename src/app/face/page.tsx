'use client';

import * as faceapi from 'face-api.js';
import './face.css';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useRef, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Webcam from 'react-webcam';

import CameraIcon from '../components/svg/CameraIcon';
import CloseIcon from '../components/svg/CloseIcon';
import SwitchCameraIcon from '../components/svg/SwitchCameraIcon';
import { db } from '../lib/firebase';

export default function FacePage({ searchParams }: { searchParams: { userId: string } }) {
  const userId = searchParams.userId;
  const router = useRouter();
  const webcamRef: React.LegacyRef<Webcam> = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [driverLicenseImage, setDriverLicenseImage] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('user');
  const [moveRight, setMoveRight] = useState<boolean>(false);
  const [moveLeft, setMoveLeft] = useState<boolean>(false);
  const [moveUp, setMoveUp] = useState<boolean>(false);

  async function getDriverLicenseImage() {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data();
    if (userData) {
      setDriverLicenseImage(userData.requirements[0].image);
    }
  }

  useEffect(() => {
    try {
      getDriverLicenseImage();
    } catch (error) {
      console.log(error);
    }
    loadModels();
  }, []);

  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models'); // Load SsdMobilenetv1 model
  };

  const handleCap = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
    }
  };

  const handleFacesMatch = async () => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { verifyIdentityRequired: false });
    setLoading(false);
    router.push('/face/success');
  };

  const compareFaces = async () => {
    if (image) {
      setLoading(true);
      try {
        const img1 = await faceapi.fetchImage(image);
        const img2 = await faceapi.fetchImage(driverLicenseImage);

        

        const detections1 = await faceapi.detectSingleFace(img1).withFaceLandmarks().withFaceDescriptor();
        const detections2 = await faceapi.detectSingleFace(img2).withFaceLandmarks().withFaceDescriptor();

        if (detections1 && detections2) {
          const distance = faceapi.euclideanDistance(detections1.descriptor, detections2.descriptor);
          if (distance < 0.6) {
            toast.success('Faces match!');
            try {
              await handleFacesMatch();
            } catch (error) {
              toast.error('An error ocurred, please try again.');
              setLoading(false);
            }
          } else {
            toast.error('Faces do not match, try again.');
            setLoading(false);
          }
        } else {
          alert('Could not detect faces in one or both images.');
          setLoading(false);
        }
      } catch (error) {
        toast.error('Error matching faces.');
        setLoading(false);
      }
    }
  };

  const handleSwitchCamera = () => {
    if (facingMode === 'environment') setFacingMode('user');
    if (facingMode === 'user') setFacingMode('environment');
  };

  useEffect(() => {
    if (image) {
      compareFaces();
    }
  }, [image]);

  // *** code added for movement detection *** //

  const detectMovement = async (direction: 'left' | 'right' | 'up') => {
    if (webcamRef.current && webcamRef.current.video) {
      const initialDetections = await faceapi.detectSingleFace(webcamRef.current.video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
      if (initialDetections) {
        const initialPosition = initialDetections.landmarks.getNose()[0];
        console.log('Initial position:', initialPosition);

        setTimeout(async () => {
          if (webcamRef.current && webcamRef.current.video) {
          
            const newDetections = await faceapi.detectSingleFace(webcamRef.current.video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
          console.log('New detections:', newDetections);
          if (newDetections) {
            const newPosition = newDetections.landmarks.getNose()[0];
            const distanceX = newPosition.x - initialPosition.x;
            const distanceY = newPosition.y - initialPosition.y;

            if (direction === 'right' && distanceX < -20) {
              console.log('Moved right');
              setMoveLeft(true);
            } else if (direction === 'left' && distanceX > 20) {
              console.log('Moved left');
              setMoveRight(true);
            } else if (direction === 'up' && distanceY < -20) {
              console.log('Moved up');
              setMoveUp(true);
            }
          }
        }
        }, 2000); // Wait for 2 seconds to detect movement
      }
    }
  };

  useEffect(() => {
    if (moveLeft && moveRight && moveUp) {
      console.log('All movements detected');
    }
  }, [moveLeft, moveRight, moveUp]);

  // *** end of code added for movement detection *** //

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black">
      {!image && (
        <Webcam
          className={`h-full w-full ${image ? 'hidden' : ''}`}
          ref={webcamRef}
          onUserMediaError={() => router.push('/face/error')}
          mirrored={facingMode === 'user'}
          videoConstraints={{
            facingMode,
          }}
        />
      )}
      {!image && (
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform items-center gap-4">
          <div className="p-3">
            <div className="h-[26px] w-[26px]" />
          </div>
          <button
            disabled={!driverLicenseImage || !(moveLeft && moveRight && moveUp)}
            className="rounded-full border-2 border-gray-300 bg-white p-6"
            onClick={handleCap}
          >
            <CameraIcon size={24} color="black" />
          </button>
          <button className="rounded-full border-2 border-gray-300 bg-white p-3" onClick={handleSwitchCamera}>
            <SwitchCameraIcon size={26} color="black" />
          </button>
        </div>
      )}
      {image && (
        <button className="absolute left-4 top-12" onClick={() => setImage(null)}>
          <CloseIcon size={24} color="white" />
        </button>
      )}
      {loading && (
        <div className="absolute flex h-full w-full items-center justify-center gap-2 bg-[rgba(0,0,0,0.5)]">
          <div className="loader" />
          <p className="text-white">Verifying identity...</p>
        </div>
      )}
      {image && <img src={image} alt="user-image" className="h-auto w-full sm:h-full sm:w-auto" />}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button onClick={() => detectMovement('left')} className="rounded-full border-2 border-gray-300 bg-white p-4">
          Move Left
        </button>
        <button onClick={() => detectMovement('right')} className="rounded-full border-2 border-gray-300 bg-white p-4">
          Move Right
        </button>
        <button onClick={() => detectMovement('up')} className="rounded-full border-2 border-gray-300 bg-white p-4">
          Move Up
        </button>
      </div>
      
    </div>
  );
}
