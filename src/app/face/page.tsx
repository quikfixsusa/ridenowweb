'use client';
import React, { useState } from 'react';

export default function FacePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [detections, setDetections] = useState(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/face', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setDetections(result.detections);
    } catch (error) {
      console.error('Error detecting faces:', error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Face Detection Page</h1>
      <p className="mt-4 text-lg">This is a test page for face detection.</p>
      <form onSubmit={handleSubmit} className="mt-4">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">Upload and Detect</button>
      </form>
      {detections && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold">Detections:</h2>
          <pre>{JSON.stringify(detections, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}