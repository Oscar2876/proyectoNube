import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';


// Registrar el Service Worker solo si es compatible con el navegador
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('✅ SW registrado:', registration);
    })
    .catch((error) => {
      console.error('❌ Error registrando SW:', error);
    });
}
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
