import React, { useEffect, useRef, useState } from "react";
import emailjs from '@emailjs/browser';
//Css de la página contáctanos
import "../components/styles/Contactanos.css";

const Contactanos = () => {
  // Para poder acceder al contenedor del mapa
  const mapRef = useRef(null);
  
  // Estados para el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    personas: '',
    fecha: '',
    lugar: '',
    comentario: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // CONFIGURACIÓN DE EMAILJS
  const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_twsqa3j', 
    TEMPLATE_ID: 'template_a5evijr', 
    PUBLIC_KEY: '51u0bmg0vrD_8Dfqt', 
    TO_EMAIL: 'emilyjacobocampos@gmail.com' // email donde se recibirán la consultas
  };

  useEffect(() => {
    // Inicializar EmailJS
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    
    // Verifica si la API de Google Maps ya está cargada
    if (window.google) {
      // Si la API ya esta cargada crea un nuevo mapa 
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 13.6918, lng: -89.2182 }, // Coordenadas del Ricaldone 
        zoom: 17,
      });

      // Crea el marcador rojito del Ricaldone 
      new window.google.maps.Marker({
        position: { lat: 13.6918, lng: -89.2182 },
        map,
        title: "Instituto Técnico Ricaldone",
      });
    }
  }, []);

  // Maneja los cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar mensaje de error cuando el usuario empiece a escribir
    if (message && message.includes('Error') || message.includes('Por favor')) {
      setMessage('');
    }
  };

  // Validación del formulario
  const validateForm = () => {
    const { nombre, telefono, email, personas, fecha, lugar } = formData;
    
    if (!nombre.trim()) {
      setMessage('❌ Por favor ingresa tu nombre completo');
      return false;
    }
    
    if (!telefono.trim()) {
      setMessage('❌ Por favor ingresa tu teléfono');
      return false;
    }
    
    if (!email.trim()) {
      setMessage('❌ Por favor ingresa tu email');
      return false;
    }
    
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage('❌ Por favor ingresa un email válido');
      return false;
    }
    
    if (!personas.trim()) {
      setMessage('❌ Por favor ingresa el número de personas');
      return false;
    }
    
    if (parseInt(personas) < 1) {
      setMessage('❌ El número de personas debe ser mayor a 0');
      return false;
    }
    
    if (!fecha.trim()) {
      setMessage('❌ Por favor selecciona una fecha');
      return false;
    }
    
    // Validar que la fecha no sea en el pasado
    const selectedDate = new Date(fecha);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      setMessage('❌ Por favor selecciona una fecha futura');
      return false;
    }
    
    if (!lugar.trim()) {
      setMessage('❌ Por favor ingresa el lugar del evento');
      return false;
    }
    
    return true;
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setMessage('📤 Enviando mensaje...');
    
    try {
      // Preparar los datos para el template de EmailJS
      const templateParams = {
        from_name: formData.nombre,
        from_email: formData.email,
        phone: formData.telefono,
        guests: formData.personas,
        event_date: formData.fecha,
        location: formData.lugar,
        message: formData.comentario || 'Sin comentarios adicionales',
        to_email: EMAILJS_CONFIG.TO_EMAIL
      };
      
      console.log('Enviando email con:', templateParams);
      
      // Enviar email usando EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );
      
      console.log('Email enviado exitosamente:', response);
      
      setMessage('✅ ¡Mensaje enviado exitosamente! Te contactaremos pronto.');
      
      // Limpiar formulario después de 2 segundos
      setTimeout(() => {
        setFormData({
          nombre: '',
          telefono: '',
          email: '',
          personas: '',
          fecha: '',
          lugar: '',
          comentario: ''
        });
        setMessage('');
      }, 3000);
      
    } catch (error) {
      console.error('Error al enviar email:', error);
      
      let errorMessage = '❌ Error al enviar el mensaje. ';
      
      if (error.status === 400) {
        errorMessage += 'Verifica tu configuración de EmailJS.';
      } else if (error.status === 401) {
        errorMessage += 'Problema de autenticación con EmailJS.';
      } else if (error.status === 402) {
        errorMessage += 'Has alcanzado el límite de emails gratuitos.';
      } else {
        errorMessage += 'Por favor intenta nuevamente.';
      }
      
      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-container">
      {/* Contenedor del mapa */}
      <div className="map-container" ref={mapRef}></div>

      <div className="form-container">
        <h2>C O N T Á C T E N O S</h2>

        {/* Mensaje de estado */}
        {message && (
          <div className={`message ${
            message.includes('✅') ? 'success' : 
            message.includes('📤') ? 'loading' : 'error'
          }`}>
            {message}
          </div>
        )}

        {/* Formulario con todos los input */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="fas fa-user"></i>
            <input 
              type="text" 
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Nombre"
              disabled={isLoading}
              required
            />
          </div>
          
          <div className="row">
            <div className="input-group">
              <i className="fas fa-phone"></i>
              <input 
                type="tel" 
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="Teléfono"
                disabled={isLoading}
                required
              />
            </div>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                disabled={isLoading}
                required
              />
            </div>
          </div>
          
          <div className="row">
            <div className="input-group">
              <i className="fas fa-users"></i>
              <input 
                type="number" 
                name="personas"
                value={formData.personas}
                onChange={handleInputChange}
                placeholder="# Personas"
                min="1"
                max="1000"
                disabled={isLoading}
                required
              />
            </div>
            <div className="input-group">
              <i className="fas fa-calendar"></i>
              <input 
                type="date" 
                name="fecha"
                value={formData.fecha}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                disabled={isLoading}
                required
              />
            </div>
            <div className="input-group">
              <i className="fas fa-map-marker-alt"></i>
              <input 
                type="text" 
                name="lugar"
                value={formData.lugar}
                onChange={handleInputChange}
                placeholder="Ubicación"
                disabled={isLoading}
                required
              />
            </div>
          </div>
          
          <div className="input-group">
            <i className="fas fa-comment"></i>
            <textarea 
              name="comentario"
              value={formData.comentario}
              onChange={handleInputChange}
              placeholder="Mensaje"
              rows="4"
              disabled={isLoading}
            />
          </div>
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                Enviando...
              </>
            ) : (
              'Enviar'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contactanos;