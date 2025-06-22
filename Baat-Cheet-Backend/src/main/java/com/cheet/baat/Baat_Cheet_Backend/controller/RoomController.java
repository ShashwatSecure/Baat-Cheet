package com.cheet.baat.Baat_Cheet_Backend.controller;

import com.cheet.baat.Baat_Cheet_Backend.entity.Room;
import com.cheet.baat.Baat_Cheet_Backend.service.RoomMessageService;
import com.cheet.baat.Baat_Cheet_Backend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> createRoom(@RequestParam String roomId,@RequestParam String username) {
        if (roomService.findRoomByRoomId(roomId).isPresent())
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Room already exists!")
            );

        Optional<Room> room = roomService.createRoom(roomId,username);
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
    public ResponseEntity<?> joinRoom(@PathVariable String roomId,@RequestParam("username") String username)
    {
        Room room  = roomService.joinRoom(roomId,username);
        if(room!=null)
            return ResponseEntity.ok().body(room);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Room not found!");
    }

    @GetMapping("/all")
    public ResponseEntity<Page<Room>> getAllRooms(@RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "20") int size)
    {
        Page<Room> rooms = roomService.getAllRooms(page,size);
        return ResponseEntity.ok().body(rooms);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteRoom(@RequestParam String roomId)
    {
        if(roomService.deleteRoom(roomId))  return ResponseEntity.ok().body("Room deleted successfully!");
        else
            return ResponseEntity.notFound().build();
    }
}
