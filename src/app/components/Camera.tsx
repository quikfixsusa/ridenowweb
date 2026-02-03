import { RotateCcw, Loader2 } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface CameraProps {
  onCapture: (imageSrc: string) => void;
  maskType: 'card' | 'circle';
  instruction: string;
  facingMode?: 'user' | 'environment';
}

const Camera: React.FC<CameraProps> = ({ onCapture, maskType, instruction, facingMode = 'environment' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startStream = useCallback(async () => {
    setError(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Camera API not available. Please ensure you are using HTTPS or localhost.');
      return;
    }

    try {
      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.srcObject = stream;
        // Use onCanPlay for better reliability
        videoRef.current.oncanplay = () => {
          videoRef.current?.play();
          setIsStreaming(true);
        };
        // Fallback: if event doesn't fire, force it after a short delay
        setTimeout(() => setIsStreaming(true), 1000);
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Camera permission denied. Please allow camera access in your browser settings.');
      } else {
        setError('Unable to access camera. Please ensure no other app is using it.');
      }
    }
  }, [facingMode]);

  useEffect(() => {
    startStream();
    return () => {
      // Cleanup stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [startStream]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (context) {
        // Flip horizontally if using front camera for natural mirror effect
        if (facingMode === 'user') {
          context.translate(canvas.width, 0);
          context.scale(-1, 1);
        }

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageSrc = canvas.toDataURL('image/jpeg', 0.9);
        onCapture(imageSrc);
      }
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-black">
      {error ? (
        <div className="p-6 text-center text-white">
          <p className="mb-4">{error}</p>
          <button
            onClick={() => startStream()}
            className="mx-auto flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium"
          >
            <RotateCcw className="h-4 w-4" />
            Retry
          </button>
        </div>
      ) : (
        <>
          {!isStreaming && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          )}
          <video
            ref={videoRef}
            className={`absolute h-full w-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''} ${
              !isStreaming ? 'invisible' : ''
            }`}
            playsInline
            autoPlay
            muted
          />
          <canvas ref={canvasRef} className="hidden" />

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
              <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center bg-gradient-to-t from-black/90 to-transparent p-8 pb-12">
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
