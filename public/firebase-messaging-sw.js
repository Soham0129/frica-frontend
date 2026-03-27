importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyC9Dx_hkATVu9r0IGB6ET8-x1H3UxBecE8",
  authDomain: "ammart-4f32c.firebaseapp.com",
  projectId: "ammart-4f32c",
  storageBucket: "ammart-4f32c.firebasestorage.app",
  messagingSenderId: "330047977789",
  appId: "1:330047977789:web:56ef430c7c85bf3e3eed54",
  measurementId: "G-G52Z05JCSL",
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
