package notify.microservices.services;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;

import lombok.AllArgsConstructor;
import notify.microservices.entity.NotificationEntity;
import notify.microservices.repository.NotificationRepository;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
@Service
@AllArgsConstructor
public class NotificationService {

    private final DynamoDbClient dynamoDbClient;
    private final Environment env;

    private final NotificationRepository notificationRepository;




    public String sendPushNotification(String token, String title, String body) {
        UUID userId = UUID.randomUUID();
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

            notificationRepository.save(notification);
            return "Enviado correctamente: " + response;
        } catch (FirebaseMessagingException e) {

            return "Error al enviar: " + e.getMessage();
        }
    }

}