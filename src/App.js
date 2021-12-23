import { useState } from 'react';
import Tesseract from 'tesseract.js'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Form from 'react-bootstrap/Form'
import './App.css';

function App() {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
  const [progreso, setProgreso] = useState(0);

  //seteo de imagen
  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  }


  //tarea de reconocimiento
  const handleClick = () => {
    Tesseract.recognize(
      imagePath, 'eng',

      {
        logger: m => {
          console.log(m)
          setProgreso(m.progress.toFixed(2) * 100)
        }
      }
    )
      .catch(err => {
        console.error(err);
      })
      .then(result => {
        let text = result.data.text
        console.log(text)
        setText(result.data.text);
      })
  }


  
  return (
    <div className="App">
      <main className="App-main">
        <ProgressBar
          now={progreso}
          label={
            progreso == 100 ? "finalizado." :
              progreso == 0 ? "" :
                "Convirtiendo: " + progreso + "%"
          }
        />
<<<<<<< HEAD
        <h3>{imagePath ? "Imagen seleccionada:" : "Imagen a Texto 😁"}</h3>
=======
        <h3>{imagePath ? "Imagen seleccionada:" : " 😁"}</h3>
>>>>>>> fbe9187b2ed86790a67bce1eb820bb171964c3df
        <img src={imagePath} className="App-image" />
        <h3>{progreso >= 100 ? "Texto extraido" : ""} </h3>
        <div className="text-box">
          <p> {text} </p>
        </div>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Seleccionar una imagen: &nbsp; </Form.Label>
          <Form.Control id="file" type="file" onChange={handleChange} />
        </Form.Group>
        <button className={imagePath ? "convertir" : "convertirnone"} onClick={handleClick} style={{ height: 50 }}> CONVERTIR A TEXTO</button>
      </main>
    </div>
  );
}

export default App
