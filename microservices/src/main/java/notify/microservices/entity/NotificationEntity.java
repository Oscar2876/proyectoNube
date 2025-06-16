package notify.microservices.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "notifications")
public class NotificationEntity {
    @Id
    private String id;
    private String userId;
    private String title;
    private String body;
    private String deviceToken;
    private boolean sent;
}