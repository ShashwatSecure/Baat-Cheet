package com.cheet.baat.Baat_Cheet_Backend.controller;

import com.cheet.baat.Baat_Cheet_Backend.entity.Room;
import com.cheet.baat.Baat_Cheet_Backend.service.RoomMessageService;
import com.cheet.baat.Baat_Cheet_Backend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin("http://localhost:5173")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomMessageService roomMessageService;

    @PostMapping("/create")
    public ResponseEntity<?> createRoom(@RequestParam String roomId) {
        if (roomService.findRoomByRoomId(roomId).isPresent())
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Room already exists!")
            );

        Optional<Room> room = roomService.createRoom(roomId);
        if (room.isPresent())
            return ResponseEntity.ok(
                    Map.of("message", "Room created successfully!", "room", room.get())
            );
        else
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Room could not be created now")
            );
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

    @GetMapping("/all")
    public ResponseEntity<Page<Room>> getAllRooms(@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "20") int size)
    {
        Page<Room> rooms = roomService.getAllRooms(page,size);
        System.out.println(rooms);
        return ResponseEntity.ok().body(rooms);
    }
}
