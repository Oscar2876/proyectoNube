importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');
firebase.initializeApp({
    apiKey: "AIzaSyCzSRmhQ-5Y8TkMaJpXB3q-YcUYFw06nDA",
    authDomain: "push-fit.firebaseapp.com",
    projectId: "push-fit",
    storageBucket: "push-fit.firebasestorage.app",
    messagingSenderId: "423673148218",
    appId: "1:423673148218:web:4d93c9b85b28c19b5c9603",
});


// Inicializa Firebase
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});