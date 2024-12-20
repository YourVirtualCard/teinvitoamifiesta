const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Asegúrate de que la carpeta "public" sea correcta

app.post('/confirmar-asistencia', (req, res) => {
    const { name, diet, email } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tu-email@gmail.com', // El correo del emisor
            pass: 'tu-contraseña' // Contraseña del correo del emisor
        }
    });

    const mailOptions = {
        from: 'tu-email@gmail.com', // El correo del emisor
        to: 'mis15lucibg@gmail.com', // El correo del receptor (organizador)
        subject: 'Confirmación de Asistencia',
        text: `Nombre: ${name}\nCorreo: ${email}\nDieta: ${diet}` // Detalles del invitado
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error al enviar el correo');
        } else {
            console.log('Correo enviado: ' + info.response);
            res.send('Confirmación enviada');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
