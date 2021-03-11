const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();
require("dotenv").config();

exports.sendEmailCotizacion = functions.firestore
    .document("cotizaciones/{docId}")
    .onCreate((snap, ctx) => {
      const data = snap.data();
      const authData = nodemailer.createTransport({
        host: "hs24.name.tools",
        port: "465",
        secure: true,
        auth: {
          user: functions.config().myenv.sender_email,
          pass: functions.config().myenv.sender_password,
        },
      });

      authData
          .sendMail({
            from: "info@edgon.online",
            to: `${data.emailCotizacion}`,
            subject: "Cotización Global Mix",
            text: `${data.data}`,
            html: `${data.data}`,
          })
          .then((resp) =>
            console.log(`Correo enviado con exito a ${data.emailCotizacion}`),
          )
          .catch((err) => console.log(err));
    });

exports.sendEmailCotizacionUser = functions.firestore
    .document("cotizacionesUsuario/{docId}")
    .onCreate((snap, ctx) => {
      const data = snap.data();
      const authData = nodemailer.createTransport({
        host: "hs24.name.tools",
        port: "465",
        secure: true,
        auth: {
          user: functions.config().myenv.sender_email,
          pass: functions.config().myenv.sender_password,
        },
      });

      authData
          .sendMail({
            from: "info@edgon.online",
            to: `${data.email}`,
            subject: "Cotización Global Mix",
            text: `${data.data}`,
            html: `${data.data}`,
          })
          .then((resp) => console.log(`email send con exito a ${data.email}`))
          .catch((err) => console.log(err));
    });

exports.sendEmailContacto = functions.firestore
    .document("contactanos/{docId}")
    .onCreate((snap, ctx) => {
      const data = snap.data();
      const authData = nodemailer.createTransport({
        host: "hs24.name.tools",
        port: "465",
        secure: true,
        auth: {
          user: functions.config().myenv.sender_email,
          pass: functions.config().myenv.sender_password,
        },
      });

      authData
          .sendMail({
            from: "info@edgon.online",
            to: "edgon85@gmail.com",
            subject: `${data.asunto}`,
            text: `${data.data}`,
            html: `${data.data}`,
          })
          .then((resp) => console.log(`email send con exito a ${data.email}`))
          .catch((err) => console.log(err));
    });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
