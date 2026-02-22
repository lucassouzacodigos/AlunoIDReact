// import { useEffect, useRef, useState } from "react";

// export default function WebcamCapture() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   const [nome, setNome] = useState("");

//   // abrir webcam
//   useEffect(() => {
//     async function start() {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       videoRef.current.srcObject = stream;
//     }
//     start();
//   }, []);

//   const tirar10foto = () => {
//     for(let i = 0; i < 10; i++){
//       tirarFoto()
//     }
//     alert("cadastrado com sucesso")
//   }

//   const tirarFoto = async () => {
//     if (!nome) return alert("digita um nome");

//     const video = videoRef.current;
//     const canvas = canvasRef.current;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0);

//     const base64 = canvas.toDataURL("image/png");

//     await fetch("http://localhost:3333/cadastro/salvarfoto", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         nome,
//         imagem: base64,
//         timestamp: Date.now()
//       }),
//     });
//   };

//   return (
//     <div>
//       <h2>Capturar rosto</h2>

//       <input
//         placeholder="nome da pessoa"
//         value={nome}
//         onChange={e => setNome(e.target.value)}
//       />

//       <br /><br />

//       <video ref={videoRef} autoPlay playsInline width={400} />
//       <canvas ref={canvasRef} style={{ display: "none" }} />

//       <br /><br />

//       <button onClick={tirar10foto}>Salvar foto</button>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import decodeToken from "../utils/tokenToJson";

export default function WebcamCapture({cpfform, nome}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const token = decodeToken()


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
    <div>
      <h2>Capturar rosto</h2>

      <br /><br />

      <video ref={videoRef} autoPlay playsInline width={400} />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <br /><br />

      <button onClick={() => tirarFoto(Date.now())}>Salvar Foto</button>
    </div>
  );
}
