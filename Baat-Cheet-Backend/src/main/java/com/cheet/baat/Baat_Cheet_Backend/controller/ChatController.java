//package com.cheet.baat.Baat_Cheet_Backend.controller;
//
//import com.cheet.baat.Baat_Cheet_Backend.entity.Room;
//import com.cheet.baat.Baat_Cheet_Backend.payload.MessageRequest;
//import com.cheet.baat.Baat_Cheet_Backend.repository.RoomRepository;
//import com.cheet.baat.Baat_Cheet_Backend.entity.Message;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.messaging.handler.annotation.DestinationVariable;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.time.LocalDateTime;
//import java.util.Optional;
//
//@RestController
//@CrossOrigin("http://localhost:5173")
//public class ChatController {
//    @Autowired
//    private RoomRepository roomRepository;
//
//    @MessageMapping("/sendMessage/{roomId}") //app/sendMessage/roomId
//    @SendTo("/topic/room/{roomId}") //subscribe
//    public Message sendMessage(
//            @DestinationVariable String roomId,
//            @RequestBody MessageRequest request
//    )
//    {
//        Optional<Room> room = roomRepository.findByRoomId(request.getRoomId());
//
//        Message message = new Message();
//        message.setContent(request.getContent());
//        message.setSender(request.getSender());
//        message.setTimeStamp(LocalDateTime.now());
//
//        if(room.isPresent())
//        {
//            room.get().getMessages().add(message);
//            roomRepository.save(room.get());
//        }
//        else {
//            throw new RuntimeException("Room not found!");
//        }
//        return message;
//    }
//}
