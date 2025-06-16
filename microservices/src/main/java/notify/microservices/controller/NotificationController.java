package notify.microservices.controller;

import notify.microservices.services.NotificationService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/notify")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/send")
    public ResponseEntity<String> send(@RequestParam String token,
            @RequestParam String title,
            @RequestParam String body) {
        try {
            String result = notificationService.sendPushNotification(token, title, body);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace(); // 👈 que se vea el error
            return ResponseEntity.status(500).body("Error interno: " + e.getMessage());
        }
    }
}