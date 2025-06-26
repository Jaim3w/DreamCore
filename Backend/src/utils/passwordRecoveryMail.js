import nodemailer from 'nodemailer';
import {config} from '../config.js';


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: config.email.username, 
    pass: config.email.password,
  },
});


const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Soporte ByteShop" <noreply.ignissoftwaredevelopers@gmail.com>', 
      to, 
      subject, 
      text, 
      html, 
    });

    return info;
  } catch (error) {
    console.error("Error enviando correo:", error);
    throw error;
  }
};

const HTMLRecoveryEmail = (code) => {
  return `
    <div style="font-family: Arial, sans-serif; text-align: center; background-color: #ffffff; padding: 30px; border: 1px solid #e0f2e9; border-radius: 10px; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2e7d32; font-size: 24px; margin-bottom: 20px;">Recuperación de Contraseña</h1>
      <p style="font-size: 16px; color: #333; line-height: 1.6;">
        Hola, hemos recibido una solicitud para restablecer tu contraseña. Utiliza el siguiente código de verificación:
      </p>
      <div style="display: inline-block; padding: 12px 24px; margin: 20px 0; font-size: 20px; font-weight: bold; color: #ffffff; background-color: #43a047; border-radius: 6px;">
        ${code}
      </div>
      <p style="font-size: 14px; color: #555; line-height: 1.5;">
        Este código es válido durante los próximos <strong>15 minutos</strong>. Si no solicitaste este correo, puedes ignorarlo con seguridad.
      </p>
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
      <footer style="font-size: 12px; color: #999;">
        ¿Necesitas ayuda? Contáctanos en 
        <a href="mailto:support@example.com" style="color: #2e7d32; text-decoration: none;">support@example.com</a>.
      </footer>
    </div>
  `;
};

export{sendEmail,HTMLRecoveryEmail};