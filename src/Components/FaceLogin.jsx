import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import decodeToken from "../utils/tokenToJson";

const WebcamCapture = forwardRef(({cpfform, nome, triggerCadastro}, ref) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const token = decodeToken()


  useImperativeHandle(ref, () =>({tirarFoto}))

  // abrir webcam
  useEffect(() => {
    async function start() {
      
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    }
    start();
  }, []);


  const tirarFoto = async (timestamp) => {
    console.log(cpfform)
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const base64 = canvas.toDataURL("image/png");

    await fetch("http://localhost:3333/cadastro/salvarfoto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cpf: cpfform,
        nome: nome,
        imagem: base64,
        timestamp
      }),
    });
  };

  return (
    <div className="flex-center" style={{flexDirection:"column", marginTop:20}}>

      <video ref={videoRef} autoPlay playsInline width={800} />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <br /><br />

      <button className="BotaoAdicionar" onClick={triggerCadastro}>Salvar Foto</button>
    </div>
  );
})

export default WebcamCapture