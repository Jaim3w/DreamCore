import React from "react";
// Css de la página about porque use algunas cositas
import "../components/styles/About.css";
const Terminos = () => {
  return (

     // Sección con padding alto para dejar espacio por el navbar fijo
    <div className="eventos-section" style={{ paddingTop: "20px" }}>

      <div className="text-content">
        <center><h2>
  <span className="title-bold">Términos  </span>
  <span className="title-bold"><i>y</i></span>{" "}
  <span className="title-light">Condiciones</span>
</h2>
          //Línea verdesita 
          <div className="underline"></div>
        </center>

       //Todo el texto de los términos y condiciones
        <p>
          <strong>Fecha de última actualización: Febrero del 2025</strong> Bienvenido a DreamCore. Al acceder y utilizar este sitio web, usted acepta los siguientes Términos y Condiciones. Si no está de acuerdo con ellos, por favor, no utilice este sitio.
        </p>

        <p>
          <strong>1. Objeto del Servicio: </strong> DreamCore ofrece el alquiler de mobiliario para eventos, incluyendo pero no limitado a mesas, sillas, escenarios, carpas y decoración. Los usuarios pueden seleccionar los productos deseados, agregarlos a un carrito de compras y proceder a realizar una reserva bajo las condiciones estipuladas.
        </p>

        <p>
          <strong>2. Uso del Sitio: </strong>Los usuarios deben ser mayores de 18 años o contar con el consentimiento de un tutor legal.
Es responsabilidad del usuario proporcionar información veraz y actualizada.
El uso indebido del sitio, como fraudes o intentos de manipulación de precios, resultará en la cancelación de la cuenta y posibles acciones legales.
        </p>

        <p>
          <strong>3. Reservas y Pagos: </strong>Los precios publicados en el sitio incluyen.
El alquiler se confirma mediante el pago completo o parcial según las políticas de DreamCore.
Las reservas están sujetas a disponibilidad y deben ser confirmadas por el equipo de DreamCore.
        </p>

        <p>
          <strong>4. Política de Cancelación: </strong>Las cancelaciones realizadas con 8 días de antelación tendrán derecho a un reembolso completo.
          Cancelaciones con menos de 15 días de anticipación estarán sujetas a una penalización del 30% del monto total.
        </p>

        <p>
          <strong>5. Entrega y Devolución: </strong> Los costos de entrega y recogida del mobiliario serán calculados según la ubicación del evento.
          El mobiliario debe ser devuelto en las mismas condiciones en que fue entregado. Los daños o pérdidas generarán cargos adicionales.
        </p>

        <p>
          <strong>6. Carrito de Compras: </strong>Los productos añadidos al carrito no se reservan hasta que se haya completado el pago.
          Los precios y disponibilidad pueden variar hasta el momento de la confirmación del pedido.
        </p>

        <p>
          <strong>7. Limitación de Responsabilidad: </strong>DreamCore no se hace responsable por daños indirectos, incidentales o punitiv
        </p>

        <p>
          <strong>8. Modificación de los Términos: </strong>DreamCore se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento, notificando a los usuarios a través del sitio web.
        </p>

        <p>
          <strong>9. Jurisdicción: </strong>Estos términos se rigen por las leyes de El Salvador, y cualquier disputa se resolverá en los tribunales competentes de El Salvador.
        </p>
      </div>
    </div>
  );
};

export default Terminos;
