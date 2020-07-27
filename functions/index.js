const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();
require('dotenv').config();

const { SENDER_EMAIL, SENDER_PASSWORD } = process.env;

exports.sendEmailCotizacion = functions.firestore
  .document('cotizaciones/{docId}')
  .onCreate((snap, ctx) => {
    const data = snap.data();
    let authData = nodemailer.createTransport({
      host: 'hs24.name.com',
      port: '465',
      secure: true,
      auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASSWORD,
      },
    });

    authData
      .sendMail({
        from: 'info@edgon.online',
        to: `${data.emailCotizacion}`,
        subject: 'Cotización Global Mix',
        text: `${data.data}`,
        html: `${data.data}`,
      })
      .then((resp) =>
        console.log(`Correo enviado con exito a ${data.emailCotizacion}`)
      )
      .catch((err) => console.log(err));
  });

exports.sendEmailCotizacionUser = functions.firestore
  .document('cotizacionesUsuario/{docId}')
  .onCreate((snap, ctx) => {
    const data = snap.data();
    let authData = nodemailer.createTransport({
      host: 'hs24.name.com',
      port: '465',
      secure: true,
      auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASSWORD,
      },
    });

    authData
      .sendMail({
        from: 'info@edgon.online',
        to: `${data.email}`,
        subject: 'Cotización Global Mix',
        text: `${data.data}`,
        html: `${data.data}`,
      })
      .then((resp) => console.log(`Correo enviado con exito a ${data.email}`))
      .catch((err) => console.log(err));
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
