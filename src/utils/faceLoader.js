import * as faceapi from "face-api.js";
import canvas from "canvas";
import path from "path";
import fs from "fs";

const { Canvas, Image, ImageData } = canvas;

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

let carregado = false;

export default async function carregarModelos() {
  if (carregado) return;

  const modelPath = path.resolve("..", "public", "models");

  await faceapi.nets.tinyFaceDetector.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);

  console.log("Modelos face-api carregados");
  carregado = true;
}

export async function gerarDescritor(imgPath) {
  await carregarModelos();

  // 🔥 LEIA COMO BUFFER
  const buffer = fs.readFileSync(imgPath);

  const img = new Image();
  img.src = buffer;

  const det = await faceapi
    .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!det) return null;

  return Array.from(det.descriptor);
}

export async function gerarDescritorBase64(base64) {
  await carregarModelos();

  const base64Limpo = base64.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Limpo, "base64");

  const img = new canvas.Image();
  img.src = buffer;

  const det = await faceapi
    .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!det) return null;

  return Array.from(det.descriptor);
}

export function compararDescritores(desc1, desc2) {
  const d1 = Float32Array.from(desc1);
  const d2 = Float32Array.from(desc2);

  const dist = faceapi.euclideanDistance(d1, d2);
  console.log("Distância:", dist);

  return dist < 0.5;
}