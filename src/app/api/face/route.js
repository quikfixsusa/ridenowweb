import * as faceapi from 'face-api.js';
import { Canvas, Image, ImageData } from 'canvas';
import fetch from 'node-fetch';
import { loadImage } from 'canvas';
import { NextApiRequest, NextApiResponse } from 'next';

faceapi.env.monkeyPatch({ Canvas, Image, ImageData, fetch });

const MODEL_URL = './public/models';

async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromDisk(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL);
}

export async function POST(req, res) {
  if (req.method === 'POST') {
    try {
      await loadModels();

      const { imageUrl } = req.body;
      const img = await loadImage(imageUrl);
      const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

      res.status(200).json({ detections });
    } catch (error) {
      console.error('Error detecting faces:', error);
      res.status(500).json({ error: 'Error detecting faces' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}