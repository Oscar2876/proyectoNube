package notify.microservices.controller;

import notify.microservices.services.NotificationService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/notify")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/push")
    public String sendPush(@RequestParam String token,
                           @RequestParam String title,
                           @RequestParam String body) {
        return notificationService.sendPushNotification(token, title, body);
    }
}