package com.cheet.baat.Baat_Cheet_Backend.controller;

import com.cheet.baat.Baat_Cheet_Backend.entity.Message;
import com.cheet.baat.Baat_Cheet_Backend.entity.Room;
import com.cheet.baat.Baat_Cheet_Backend.repository.RoomRepository;
import com.cheet.baat.Baat_Cheet_Backend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin("http://localhost:5173")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private RoomService roomService;

    @PostMapping("/create")
    public ResponseEntity<?> createRoom(@RequestParam String roomId)
    {
        if(roomService.findRoomByRoomId(roomId).isPresent())
            return ResponseEntity.badRequest().body("Room already exists!");

        //creating a new room
        Room room = new Room();
        room.setRoomId(roomId);
        Room savedRoom = roomRepository.save(room);
        System.out.println("Room Created");
        return ResponseEntity.status(HttpStatus.CREATED).body(room);
    }

    @PostMapping("/{roomId}")
    public ResponseEntity<?> joinRoom(@PathVariable String roomId)
    {
        Optional<Room> room = roomService.findRoomByRoomId(roomId);
        if(room.isPresent())
        {
            return ResponseEntity.ok("Room joined!");
        }
        else
        {
            System.out.println("Room not found!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Room not found!");
        }
    }

//    @GetMapping("/{roomId}/messages")
//    public ResponseEntity<?> getMessages(@PathVariable String roomId,
//                                         @RequestParam(value = "page", defaultValue = "0", required = false) int page,
//                                         @RequestParam(value = "size", defaultValue = "20", required = false) int size){
//
//        Optional<Room> room = roomService.findRoomByRoomId(roomId);
//        if(room.isEmpty())
//        {
//            return ResponseEntity.badRequest().body("Room not found!");
//        }
//
//        //retrieving all the messages of the room
////        List<Message> messages = room.get().getMessages();
//
//        //paginating the messages according to the given size
//        int start = Math.max(0,messages.size()-(page+1)*size);
//        int end = Math.min(messages.size(),start+size);
//
//        List<Message> paginatedMessages = messages.subList(start,end);
//
//        return ResponseEntity.ok(paginatedMessages);
//    }

//    @PostMapping("/{roomId}/messages")

}
