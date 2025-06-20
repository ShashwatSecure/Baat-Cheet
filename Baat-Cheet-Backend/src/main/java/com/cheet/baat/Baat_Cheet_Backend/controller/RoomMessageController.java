package com.cheet.baat.Baat_Cheet_Backend.controller;

import com.cheet.baat.Baat_Cheet_Backend.entity.RoomMessage;
import com.cheet.baat.Baat_Cheet_Backend.service.RoomMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
public class RoomMessageController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private RoomMessageService roomMessageService;

    @MessageMapping("/send/{roomId}") // listens to /app/send/{roomId}
    public void sendMessage(@DestinationVariable String roomId, RoomMessage message) {
        message.setTimeStamp(LocalDateTime.now());
        message.setRoomId(roomId);

        roomMessageService.saveMessage(message);

        messagingTemplate.convertAndSend("/topic/room/" + roomId, message);
    }
}
