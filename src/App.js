import { useState } from 'react';
import Tesseract from 'tesseract.js'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Form from 'react-bootstrap/Form'
import './App.css';

function App() {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
  const [progreso, setProgreso] = useState(0);

  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  }


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
        <h3>{imagePath ? "Imagen seleccionada:" : "pokerstars a texto 😁"}</h3>
        <img src={imagePath} className="App-image" />
        <h3>{progreso >= 100 ? "Texto extraido" : ""} </h3>
        <div className="text-box">
          <p> {text} </p>
        </div>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Seleccionar una imagen: &nbsp; </Form.Label>
          <Form.Control id="file" type="file" onChange={handleChange} />
        </Form.Group>
        <button className={imagePath?"convertir": "convertirnone"} onClick={handleClick} style={{ height: 50 }}> CONVERTIR A TEXTO</button>
      </main>
    </div>
  );
}

export default App