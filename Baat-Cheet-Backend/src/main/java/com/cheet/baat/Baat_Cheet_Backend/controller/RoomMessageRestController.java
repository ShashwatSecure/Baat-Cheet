package com.cheet.baat.Baat_Cheet_Backend.controller;

import com.cheet.baat.Baat_Cheet_Backend.entity.RoomMessage;
import com.cheet.baat.Baat_Cheet_Backend.service.RoomMessageService;
import com.cheet.baat.Baat_Cheet_Backend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin("http://localhost:5173")
public class RoomMessageRestController {

    @Autowired
    private RoomMessageService roomMessageService;

    @GetMapping("/{roomId}")
    public Page<RoomMessage> getMessagesByRoom(
            @PathVariable String roomId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return roomMessageService.getMessagesByRoom(roomId, page, size);
    }
}
