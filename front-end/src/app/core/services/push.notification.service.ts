import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  private messaging: Messaging;
  private vapidKey = environment.firebaseConfig.vapidKey;


  constructor() {
    // Inicializar Firebase una sola vez
    const app = initializeApp(environment.firebaseConfig);
    this.messaging = getMessaging(app);
  }

  async requestPermission(): Promise<string | null> {
    try {
      // Asegúrate que el Service Worker esté activo
      const registration = await navigator.serviceWorker.ready;
      console.log('✅ Service Worker listo:', registration);
      console.log('🔔 Solicitando permisos para notificaciones...')
      console.log('🔔 que dice messagin:', this.messaging);
      console.log('🔔 que dice vapidKey:', this.vapidKey);

      // Obtener el token con VAPID Key y SW
      const token = await getToken(this.messaging, {
        vapidKey: this.vapidKey,
        serviceWorkerRegistration: registration,
      });

      if (token) {
        console.log('✅ Token FCM:', token);
        return token;
      } else {
        console.warn('⚠️ No se recibió token, el usuario no aceptó permisos.');
        return null;
      }
    } catch (error) {
      console.error('❌ No se pudo obtener el token FCM', error);
      throw error;
    }
  }

  listenToMessages(): void {
    onMessage(this.messaging, (payload) => {
      console.log('📩 Mensaje recibido en primer plano:', payload);
      // Aquí puedes emitir este mensaje a un Subject o mostrar una notificación
    });
  }
}
