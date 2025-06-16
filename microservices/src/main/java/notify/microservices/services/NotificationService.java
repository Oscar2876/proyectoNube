package notify.microservices.services;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;

import notify.microservices.entity.NotificationEntity;
import notify.microservices.repository.NotificationRepository;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository repo;

    public String sendPushNotification(String token, String title, String body) {
        UUID userId = UUID.randomUUID(); // Valida formato
        NotificationEntity notification = new NotificationEntity(null, userId.toString(), title, body, token, false);

        try {
            Message message = Message.builder()
                    .setToken(token)
                    .setNotification(Notification.builder()
                            .setTitle(title)
                            .setBody(body)
                            .build())
                    .build();

            String response = FirebaseMessaging.getInstance().send(message);
            notification.setSent(true);
            repo.save(notification);
            return "Enviado correctamente: " + response;
        } catch (FirebaseMessagingException e) {
            repo.save(notification);
            return "Error al enviar: " + e.getMessage();
        }
    }
}