import React from "react";
// Css de la página acerca de
import "../components/styles/About.css";
// Importo las imágenes desde la carpeta "assets"
import img1 from "../assets/evento1.png";
import img2 from "../assets/evento2.png";
import img3 from "../assets/evento3.png";

// Para poder utilizar los iconos de react-icons
import { FaHandshake, FaPencilRuler, FaComments } from "react-icons/fa";


const EventosBoutique = () => {
  return (

     // Sección con padding alto para dejar espacio por el navbar fijo
    <div className="eventos-section" style={{ paddingTop: "80px" }}>

      <div className="text-content">
        <center><h2> <span className="title-bold">EVENTOS       </span>{""}<span className="title-light">     BOUTIQUE</span></h2>
        <div className="underline"></div>
            </center>
        
{/* Información acerca de DreamCore */}
        <p>
          Somos una empresa dedicada al alquiler, diseño y montaje de equipos
          para eventos sociales y corporativos. Innovamos y ofrecemos algo más
          allá de lo común y de lo que ya existe en nuestro mercado. Creamos
          conceptos y ambientes bajo el tema, en base al cual diseñamos y
          sobrepasamos expectativas.
        </p>

        <p>
          Además, contamos con equipo para alquiler exclusivo e importado para
          todo tipo de eventos, realizamos montajes personalizados y ofrecemos
          una atención de forma personalizada. Nuestro objetivo es convertir un
          evento en algo único.
        </p>

{/* Iconos de cada servicio */}
        <div className="iconos">
          <div>
            <FaHandshake className="icono" />
            <p>ALQUILER</p>
          </div>
          <div>
            <FaPencilRuler className="icono" />
            <p>DISEÑO</p>
          </div>
          <div>
            <FaComments className="icono" />
            <p>ASESORÍA</p>
          </div>
        </div>
      </div>

{/* Contenedor de imágenes */}
      <div className="imagenes-superpuestas">
        <img src={img1} alt="Alquiler" className="img img-left" />
        <img src={img2} alt="Decoración" className="img img-center" />
        <img src={img3} alt="Asesoría" className="img img-right" />
      </div>
    </div>
  );
};

export default EventosBoutique;
