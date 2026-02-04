import { RotateCcw, Loader2, SwitchCamera } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface CameraProps {
  onCapture: (imageSrc: string) => void;
  maskType: 'card' | 'circle';
  instruction: string;
  facingMode?: 'user' | 'environment';
}

const Camera: React.FC<CameraProps> = ({ onCapture, maskType, instruction, facingMode = 'environment' }) => {
  const webcamRef = useRef<Webcam>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFacingMode, setActiveFacingMode] = useState(facingMode);

  const handleUserMedia = useCallback(() => {
    setIsStreaming(true);
    setError(null);
  }, []);

  const handleUserMediaError = useCallback(
    (err: string | DOMException) => {
      const errorObj = typeof err === 'string' ? new Error(err) : err;
      console.error('Camera initialization failed', errorObj);

      // Auto-fallback: If we failed on 'user' facing mode, automatically switch to 'environment'
      if (activeFacingMode === 'user') {
        console.warn('Fast-fail: Front camera failed, switching directly to environment.');
        setActiveFacingMode('environment');
        return;
      }

      setIsStreaming(false);

      if (errorObj.name === 'NotAllowedError' || errorObj.name === 'PermissionDeniedError') {
        setError('Camera permission denied. Please allow camera access in your browser settings.');
      } else {
        setError('Unable to access camera. Please ensure no other app is using it.');
      }
    },
    [activeFacingMode],
  );

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [onCapture]);

  const getVideoConstraints = () => {
    if (activeFacingMode === 'user') {
      return { facingMode: 'user' }; // Minimal constraints
    }
    return {
      facingMode: 'environment',
      width: { ideal: 1920 },
      height: { ideal: 1080 },
    };
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-black">
      {error ? (
        <div className="p-6 text-center text-white">
          <p className="mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              // Force re-render/retry logic if needed, usually changing key or state
              // Switching modes is the best way to retry cleanly
              setActiveFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
            }}
            className="mx-auto flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium"
          >
            <RotateCcw className="h-4 w-4" />
            Retry / Switch
          </button>
        </div>
      ) : (
        <>
          {/* Flip Camera Button - Always visible */}
          <div className="pointer-events-auto absolute right-6 top-6 z-10">
            <button
              onClick={() => setActiveFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'))}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-transform active:scale-95"
            >
              <SwitchCamera className="h-6 w-6" />
            </button>
          </div>

          {!isStreaming && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          )}

          <Webcam
            ref={webcamRef}
            audio={false}
            className={`absolute h-full w-full object-cover ${activeFacingMode === 'user' ? 'scale-x-[-1]' : ''} ${
              !isStreaming ? 'invisible' : ''
            }`}
            screenshotFormat="image/jpeg"
            videoConstraints={getVideoConstraints()}
            onUserMedia={handleUserMedia}
            onUserMediaError={handleUserMediaError}
          />

          {/* Overlays based on mask type */}
          {isStreaming && (
            <>
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-black/40"></div>

                {/* Cutout */}
                {maskType === 'card' && (
                  <div className="absolute left-1/2 top-1/2 aspect-[1.586/1] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-white/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
                    <div className="absolute inset-0 animate-pulse rounded-lg border-2 border-blue-500/50"></div>
                  </div>
                )}

                {maskType === 'circle' && (
                  <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
                    <div className="animate-pulse-fast absolute inset-0 rounded-full border-4 border-blue-500/30"></div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center bg-gradient-to-t from-black/90 to-transparent p-8 pb-[calc(4rem+env(safe-area-inset-bottom))]">
                <p className="mb-8 px-4 text-center text-lg font-medium text-white drop-shadow-md">{instruction}</p>

                <div className="flex items-center gap-8">
                  {/* Capture Button */}
                  <button
                    onClick={handleCapture}
                    className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-white/20 transition-transform active:scale-95"
                    aria-label="Capture Photo"
                  >
                    <div className="h-16 w-16 rounded-full bg-white"></div>
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Camera;
