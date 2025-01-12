'use client';

import * as faceapi from 'face-api.js';
import './face.css';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useRef, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Webcam from 'react-webcam';

import CloseIcon from '../components/svg/CloseIcon';
import HorizontalFaceForward from '../components/svg/verifyIdentity/HorizontalFaceForward';
import HorizontalFaceLeft from '../components/svg/verifyIdentity/HorizontalFaceLeft';
import HorizontalFaceRight from '../components/svg/verifyIdentity/HorizontalFaceRight';
import MiniFaceCenter from '../components/svg/verifyIdentity/MiniFaceCenter';
import MiniFaceLeft from '../components/svg/verifyIdentity/MiniFaceLeft';
import MiniFaceRight from '../components/svg/verifyIdentity/MiniFaceRight';
import VerticalFaceForward from '../components/svg/verifyIdentity/VerticalFaceForward';
import VerticalFaceLeft from '../components/svg/verifyIdentity/VerticalFaceLeft';
import VerticalFaceRight from '../components/svg/verifyIdentity/VerticalFaceRight';
import { db } from '../lib/firebase';

export default function FacePage({ searchParams }: { searchParams: { userId: string } }) {
  const userId = searchParams.userId;
  const router = useRouter();
  const webcamRef: React.LegacyRef<Webcam> = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [widthCamera, setWidthCamera] = useState<number | null>(null);
  const [heigthCamera, setHeigthCamera] = useState<number | null>(null);
  const [driverLicenseImage, setDriverLicenseImage] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [facingMode] = useState<'environment' | 'user'>('user');

  const [moveRight, setMoveRight] = useState<boolean>(false);
  const [moveLeft, setMoveLeft] = useState<boolean>(false);
  const [moveCenter, setMoveCenter] = useState<boolean>(false);
  const [moveFinalCenter, setMoveFinalCenter] = useState<boolean>(false);

  const [checkCenter, setCheckCenter] = useState<boolean>(false);
  const [checkRight, setCheckRight] = useState<boolean>(false);
  const [checkLeft, setCheckLeft] = useState<boolean>(false);
  const [checkFinalCenter, setCheckFinalCenter] = useState<boolean>(false);

  const [instruction, setInstruction] = useState<string>('Center your face');

  async function getDriverLicenseImage() {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data();
    if (userData) {
      setDriverLicenseImage(userData.requirements[0].image);
    }
  }

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
    await updateDoc(userRef, { verifyIdentityRequired: false, status: 'available' });
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

  const isFaceForward = (landmarks: faceapi.FaceLandmarks68) => {
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    const nose = landmarks.getNose();

    const eyeDistance = Math.abs(leftEye[0].x - rightEye[3].x);
    const noseToEyeDistance = Math.abs(nose[0].x - (leftEye[0].x + rightEye[3].x) / 2);

    return noseToEyeDistance < eyeDistance * 0.1; // Adjust this threshold as needed
  };

  const isFaceLeftProfile = (landmarks: faceapi.FaceLandmarks68) => {
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    const nose = landmarks.getNose();

    const eyeDistance = Math.abs(leftEye[0].x - rightEye[3].x);
    const noseToRightEyeDistance = Math.abs(nose[0].x - rightEye[3].x);

    // Si la nariz está significativamente más cerca del ojo derecho, es perfil izquierdo
    return noseToRightEyeDistance > eyeDistance * 0.6; // Ajustar el umbral si es necesario
  };

  const isFaceRightProfile = (landmarks: faceapi.FaceLandmarks68) => {
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    const nose = landmarks.getNose();

    const eyeDistance = Math.abs(leftEye[0].x - rightEye[3].x);
    const noseToLeftEyeDistance = Math.abs(nose[0].x - leftEye[0].x);

    // Si la nariz está significativamente más cerca del ojo izquierdo, es perfil derecho
    return noseToLeftEyeDistance > eyeDistance * 0.6; // Ajustar el umbral si es necesario
  };

  const detectMovement = async (direction: 'left' | 'right' | 'center' | 'finalCenter') => {
    return new Promise<boolean>(async (resolve) => {
      const interval = setInterval(async () => {
        if (webcamRef.current && webcamRef.current.video) {
          setTimeout(async () => {
            if (webcamRef.current && webcamRef.current.video) {
              const newDetections = await faceapi
                .detectSingleFace(webcamRef.current.video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks();
              if (newDetections) {
                const isForward = isFaceForward(newDetections.landmarks);
                const isLeftProfile = isFaceLeftProfile(newDetections.landmarks);
                const isRightProfile = isFaceRightProfile(newDetections.landmarks);

                if (direction === 'center' && isForward) {
                  setCheckCenter(true);
                  setTimeout(() => {
                    setInstruction('Look Right');
                    setMoveCenter(true);
                    clearInterval(interval);
                    resolve(true);
                  }, 1000);
                } else if (direction === 'right' && isLeftProfile) {
                  setCheckRight(true);
                  setTimeout(() => {
                    setInstruction('Look Left');
                    setMoveRight(true);
                    clearInterval(interval);
                    resolve(true);
                  }, 1000);
                } else if (direction === 'left' && isRightProfile) {
                  setCheckLeft(true);
                  setTimeout(() => {
                    setInstruction('Center your face');
                    setMoveLeft(true);
                    clearInterval(interval);
                    resolve(true);
                  }, 1000);
                } else if (direction === 'finalCenter' && isForward) {
                  setCheckFinalCenter(true);
                  setTimeout(() => {
                    setMoveFinalCenter(true);
                    clearInterval(interval);
                    resolve(true);
                  }, 1000);
                }
              }
            }
          }, 2000); // Wait for 2 seconds to detect movement
        }
      }, 1000); // Check for movement every second
    });
  };

  const startMovementDetection = async () => {
    let success = await detectMovement('center');

    if (success) {
      success = await detectMovement('right');
    }
    if (success) {
      success = await detectMovement('left');
    }
    if (success) {
      success = await detectMovement('finalCenter');
      handleCap();
    }
  };

  useEffect(() => {
    if (image) {
      compareFaces();
    }
  }, [image]);

  useEffect(() => {
    try {
      getDriverLicenseImage();
    } catch (error) {
      console.log(error);
    }
    loadModels();
  }, []);

  useEffect(() => {
    if (webcamRef.current && webcamRef.current.video) {
      const video = webcamRef.current.video;
      const width = video.offsetWidth;
      const height = video.offsetHeight;
      setWidthCamera(width);
      setHeigthCamera(height);
    }
  }, [webcamRef.current]);

  useEffect(() => {
    startMovementDetection();
  }, []);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-black">
      {!image && (
        <div className="relative flex w-full items-center justify-center">
          {heigthCamera && widthCamera && heigthCamera > widthCamera && !moveCenter && (
            <VerticalFaceForward check={checkCenter} />
          )}
          {heigthCamera && widthCamera && heigthCamera < widthCamera && !moveCenter && (
            <HorizontalFaceForward check={checkCenter} />
          )}

          {heigthCamera && widthCamera && heigthCamera > widthCamera && moveCenter && !moveRight && (
            <VerticalFaceRight check={checkRight} />
          )}
          {heigthCamera && widthCamera && heigthCamera < widthCamera && moveCenter && !moveRight && (
            <HorizontalFaceRight check={checkRight} />
          )}

          {heigthCamera && widthCamera && heigthCamera > widthCamera && moveRight && !moveLeft && (
            <VerticalFaceLeft check={checkLeft} />
          )}
          {heigthCamera && widthCamera && heigthCamera < widthCamera && moveRight && !moveLeft && (
            <HorizontalFaceLeft check={checkLeft} />
          )}

          {heigthCamera && widthCamera && heigthCamera > widthCamera && !moveFinalCenter && moveLeft && (
            <VerticalFaceForward check={checkFinalCenter} />
          )}
          {heigthCamera && widthCamera && heigthCamera < widthCamera && !moveFinalCenter && moveLeft && (
            <HorizontalFaceForward check={checkFinalCenter} />
          )}
          <Webcam
            className={`relative w-full ${image ? 'hidden' : ''}`}
            ref={webcamRef}
            onUserMediaError={() => router.push('/face/error')}
            mirrored={facingMode === 'user'}
            videoConstraints={{
              facingMode,
            }}
          />
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

      {!moveFinalCenter && (
        <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 transform flex-col items-center gap-7">
          <p className="font-medium text-white">{instruction}</p>
          {!moveCenter && <MiniFaceCenter size={68} />}
          {moveCenter && !moveRight && <MiniFaceRight size={68} />}
          {moveRight && !moveLeft && <MiniFaceLeft size={68} />}
          {moveLeft && !moveFinalCenter && <MiniFaceCenter size={68} />}
        </div>
      )}
    </div>
  );
}
