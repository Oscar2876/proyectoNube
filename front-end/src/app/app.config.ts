import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
//import { providePrimeNG } from 'primeng/config';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';  // Import Firebase
import { provideMessaging, getMessaging } from '@angular/fire/messaging';  // Firebase Messaging
//import { FirebaseApp } from '@angular/fire/app';
import { PushNotificationService } from './core/services/push.notification.service';  // Tu servicio de notificaciones push
import { environment } from '../environments/environment';
import { EnvironmentProviders, makeEnvironmentProviders, NgZone } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      HttpClientModule,
      FormsModule,
    ), provideAnimationsAsync(),
    //providePrimeNG({
    //  theme: {
    //    preset: Aura
    //  }
    //}),

    // Inicializar Firebase con la configuración de environment.ts
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

    // Configuración de Firebase Messaging
    provideMessaging(() => getMessaging()),

    // Tu servicio de PushNotificationService
    PushNotificationService
  ]
};
function provideZoneChangeDetection(options: { eventCoalescing: boolean; }): EnvironmentProviders {
  // This is a placeholder for a real implementation.
  // In Angular, zone-related providers are typically configured at bootstrap.
  // Here, we simply return an empty provider array, as Angular does not expose
  // a direct provider for zone change detection with event coalescing.
  // You may implement custom logic here if needed.
  return makeEnvironmentProviders([]);
}

