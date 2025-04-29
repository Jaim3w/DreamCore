import React, { useEffect, useRef } from "react";
//Css de la página contáctanos
import "../components/styles/Contactanos.css";

const Contactanos = () => {
    // Para poder acceder al contenedor del mapa
  const mapRef = useRef(null);

  useEffect(() => {
    // Verifica si la API ya está cargada
    if (window.google) {
        // Si la API ya esta cargada crea un nuevo mapa 
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 13.6918, lng: -89.2182 }, // Coordenadas del Ricaldone 
        zoom: 17,
      });

      // Crea el maracador rojito del Ricaldone 
      new window.google.maps.Marker({
        position: { lat: 13.6918, lng: -89.2182 },
        map,
        title: "Instituto Técnico Ricaldone",
      });
    }
  }, []);

  return (
    <div className="contact-container">
        {/* Contenedor del mapa */}
      <div className="map-container" ref={mapRef}></div>

      <div className="form-container">
        <h2>C O N T Á C T E N O S</h2>

        {/* Formulario con todos los input */}
        <form>
          <div className="input-group">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Nombre Completo" />
          </div>
          <div className="row">
            <div className="input-group">
              <i className="fas fa-phone"></i>
              <input type="tel" placeholder="Teléfono" />
            </div>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
          </div>
          <div className="row">
            <div className="input-group">
              <i className="fas fa-users"></i>
              <input type="number" placeholder="# Personas" />
            </div>
            <div className="input-group">
              <i className="fas fa-calendar"></i>
              <input type="date" />
            </div>
            <div className="input-group">
              <i className="fas fa-map-marker-alt"></i>
              <input type="text" placeholder="Lugar" />
            </div>
          </div>
          <div className="input-group">
            <textarea placeholder="Comentario" rows="4" />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Contactanos;
