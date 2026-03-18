import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import ReactDom from 'react-dom'
import decodeToken from "../utils/tokenToJson";
import { useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'

export default function FaceLogin() {
  const videoRef = useRef();
  const [status, setStatus] = useState("Carregando modelos...");
  const [liberado, setLiberado] = useState(false);
  const navigate = useNavigate()
  const token = decodeToken()
  let cpf = ''


  // iniciar
  useEffect(() => {
    start();
  }, []);

  async function start() {
    console.log(token)
    cpf = await fetch(`http://localhost:3333/controle/${token.userID}/cpf`).then(res => res.json())
    console.log(cpf)


    await carregarModelos();
    await iniciarWebcam();
    await carregarRostoReferencia();
  }

  // carregar modelos
  async function carregarModelos() {
    const MODEL_URL = "/models";

    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);

    setStatus("Modelos carregados");
  }

  // webcam
  async function iniciarWebcam() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  }

  let labeledDescriptor;

  // carregar foto salva
  async function carregarRostoReferencia() {
    setStatus("Carregando rosto salvo...");

    const img = await faceapi.fetchImage(`/rostos/${token.nome}/${cpf}.png`);

    const detections = await faceapi
      .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detections) {
      setStatus("❌ Nenhum rosto na foto salva");
      return;
    }

    labeledDescriptor = new faceapi.LabeledFaceDescriptors("Pessoa", [
      detections.descriptor,
    ]);

    reconhecer();
  }

  // reconhecimento em tempo real
  async function reconhecer() {


    setStatus("Reconhecendo...");

    const faceMatcher = new faceapi.FaceMatcher([labeledDescriptor], 0.5);

    setInterval(async () => {
      if (liberado == true) {
        console.log("liberado")
        navigate("/")
      }


      if (!videoRef.current) return;

      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (!detections.length) {
        setStatus("Nenhum rosto...");
        return;
      }

      const match = faceMatcher.findBestMatch(detections[0].descriptor);

      if (match.label === "Pessoa") {
        setStatus("🟢 ACESSO LIBERADO");
        console.log("liberado")
        setLiberado(true);
        navigate("/")
      } else {
        setStatus("Rosto não reconhecido");
        setLiberado(false);
      }
    }, 800);
  }

  return ReactDom.createPortal(
    <>
    <motion.div className="loginComRostoMODAL" 

    >
      <motion.div className="loginComRostoCONTENT" 
      
      >

    <div style={{ textAlign: "center" }} >
      <h2 onClick={navigate("/")}>Sistema Facial</h2>

      <video
        ref={videoRef}
        autoPlay
        muted
        width="600"
        height="450"
        style={{ borderRadius: 15, border: "2px solid black" }}
      />

      <h3>{status}</h3>

      {liberado && (
        <h1 style={{ color: "green" }}>
          LOGIN TRUE
        </h1>
      )}
    </div>

    </motion.div>
      </motion.div>
    </>,
    document.getElementById("portal")
  );
}
